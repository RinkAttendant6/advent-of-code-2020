import * as fs from "fs";

/**
 * Solve
 * @param input Starting numbers
 * @param n Number of turns
 */
const solve = (input: number[], n: number): number => {
  let h: Map<number, number> = new Map();
  let num: number = input[0]!;

  for (let turn = 0; turn < n; ++turn) {
    if (turn < input.length) {
      // Still in starting numbers
      if (turn > 0) {
        // Ignore first iteration
        h.set(num, turn);
      }
      num = input[turn]!;
      continue;
    }

    if (h.has(num)) {
      let lastTurn = h.get(num)!;
      h.set(num, turn);
      num = turn - lastTurn;
    } else {
      h.set(num, turn);
      num = 0;
    }
  }

  return num;
};

const input: number[] = fs
  .readFileSync(process.argv[2] ?? __dirname + "/input.txt", {
    encoding: "utf8",
  })
  .trim()
  .split(",")
  .map(Number);

console.log(solve(input, 2020), solve(input, 30_000_000));
