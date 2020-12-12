import { parseNumericInput } from "../shared/utils.js";

/**
 * Calculate sums of all pairs of numbers
 * @param numbers Array of numbers
 */
const findAllSums = (numbers: number[]): number[] => {
  const sums: number[] = [];

  for (let i = 0; i < numbers.length - 1; ++i) {
    for (let j = i + 1; j < numbers.length; ++j) {
      sums.push(numbers[i]! + numbers[j]!);
    }
  }

  return sums;
};

const data = parseNumericInput(process.argv[2] ?? __dirname + "/input.txt");

let part1 = -Infinity;

for (let i = 25; i < data.length; ++i) {
  const preamble = data.slice(i - 25, i);
  const sums = findAllSums(preamble);

  if (!sums.includes(data[i]!)) {
    part1 = data[i]!;
    break;
  }
}

outerLoop: for (let i = 0; i < data.length - 1; ++i) {
  let sum = data[i]!;

  for (let j = i + 1; sum < part1! && j < data.length; ++j) {
    sum += data[j]!;

    if (sum === part1) {
      const range = data.slice(i, j + 1);
      console.log(part1, Math.min(...range) + Math.max(...range));
      break outerLoop;
    }
  }
}
