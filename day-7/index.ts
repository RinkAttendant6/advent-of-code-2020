import * as fs from "fs";
import * as readline from "readline";

interface BagMap {
  [key: string]: BagContents;
}

interface BagContents {
  [key: string]: number;
}

/**
 * Find all bags that can contain a specific bag
 * @param hashmap Hashmap of bag contents
 * @param bag Bag to look for
 */
const findPotentialOuterBags = (hashmap: BagMap, bag: string): Set<string> => {
  const unprocessed: string[] = [bag];
  const result: Set<string> = new Set();

  while (unprocessed.length > 0) {
    const current = unprocessed.pop()!;

    for (const [outer, inner] of Object.entries(hashmap)) {
      if (inner[current]) {
        result.add(outer);
        unprocessed.push(outer);
      }
    }
  }

  return result;
};

/**
 * Find all bags inside a specific bag
 * @param hashmap Hashmap of bag contents
 * @param bag Bag to search inside
 */
const findBagsInside = (hashmap: BagMap, bag: string): number => {
  let unprocessed = [bag];
  let answer = 0;

  while (unprocessed.length > 0) {
    const current = unprocessed.pop()!;

    if (hashmap[current]) {
      for (const [b, qty] of Object.entries(hashmap[current]!)) {
        unprocessed.push(...Array(qty).fill(b));
        answer += qty;
      }
    }
  }

  return answer;
};

(async (filePath: string = __dirname + "/input.txt") => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  const bags: BagMap = {};

  for await (let line of rl) {
    const bag = line.match(/^([\w ]+?) bags/)?.[1]!;
    const matches = line.matchAll(/(?<qty>\d+) (?<colour>[\w ]+) bag[s.,]?/g);

    let inner: BagContents = {};

    for (const match of matches) {
      inner[match.groups!.colour!] = Number(match.groups!.qty);
    }

    bags[bag] = inner;
  }

  console.log(
    findPotentialOuterBags(bags, "shiny gold").size,
    findBagsInside(bags, "shiny gold")
  );
})(process.argv[2]);
