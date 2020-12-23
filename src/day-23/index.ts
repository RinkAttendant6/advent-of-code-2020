import * as fs from "fs";

const initialSequence = fs
  .readFileSync(process.argv[2] ?? __dirname + "/input.txt", {
    encoding: "utf8",
  })
  .split("")
  .map(Number);

/**
 * Generate an array of incrementing cups
 * @param cups Initial cup sequence
 * @param numberOfCups Total desired number of cups
 */
const generateCupArray = (
  cups: number[] = [],
  numberOfCups: number | null = null
): number[] => {
  if (numberOfCups === null) {
    return cups;
  }

  for (let max = Math.max(...cups); cups.length < numberOfCups; max++) {
    cups.push(max + 1);
  }

  return cups;
};

/**
 * Solve the game
 * @param cups Initial cup sequence
 * @param moves Number of moves
 */
const solve = (
  cups: number[],
  moves = 10,
  cupsPerMove = 3
): Map<number, number> => {
  const linkedHashMap = new Map<number, number>();

  cups.forEach((cup, index) => {
    linkedHashMap.set(cup, cups[index + 1] ?? cups[0]!);
  });

  let currentCup = cups[0]!;

  for (let move = 1; move <= moves; ++move) {
    // get cups to remove
    const pickup: number[] = [linkedHashMap.get(currentCup)!];
    while (pickup.length < cupsPerMove) {
      pickup.push(linkedHashMap.get(pickup[pickup.length - 1]!)!);
    }

    // set next pointer of current cup to next cup of the last removed
    const nextCup = linkedHashMap.get(pickup[pickup.length - 1]!)!;
    linkedHashMap.set(currentCup, nextCup);

    // find where to insert the cups
    let destinationCup = currentCup === 1 ? cups.length : currentCup - 1;

    while (pickup.includes(destinationCup)) {
      destinationCup--;
      if (destinationCup === 0) {
        destinationCup = cups.length;
      }
    }

    // insert the sequence of cups by adjusting pointers
    const destinationNext = linkedHashMap.get(destinationCup)!;
    linkedHashMap.set(destinationCup, pickup[0]!);
    linkedHashMap.set(pickup[pickup.length - 1]!, destinationNext);

    currentCup = nextCup;
  }

  return linkedHashMap;
};

// Part 1
console.log(
  (() => {
    const part1 = solve(generateCupArray([...initialSequence]), 100);

    let sequence = "";
    let key = 1;

    while (true) {
      let next = part1.get(key)!;
      if (next === 1) {
        break;
      }

      sequence += next;
      key = next;
    }

    return sequence;
  })()
);

// Part 2
console.log(
  (() => {
    const part2 = solve(
      generateCupArray([...initialSequence], 1_000_000),
      10_000_000
    );

    return part2.get(1)! * part2.get(part2.get(1)!)!;
  })()
);
