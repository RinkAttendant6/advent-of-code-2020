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

  const lines: BagMap = {};

  for await (let line of rl) {
    const [outer, contents]: string[] = line.split(" bags contain ");

    let inner: BagContents = {};

    contents!.split(", ").forEach((bag: string) => {
      let matches = bag.match(/(?<qty>\d+) (?<colour>[\w ]+) bags?/)?.groups;
      if (matches) {
        inner[matches.colour!] = Number(matches.qty);
      }
    });

    lines[outer!] = inner;
  }

  console.log(
    findPotentialOuterBags(lines, "shiny gold").size,
    findBagsInside(lines, "shiny gold")
  );
})(process.argv[2]);
