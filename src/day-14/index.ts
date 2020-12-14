import { parseInputAsync } from "../shared/utils.js";

const NUMBER_WIDTH = 36;

/**
 * Find the sum of all values in a map
 * @param memory Map
 */
const findSumOfMap = (memory: Map<any, number>): number => {
  let sum = 0;
  for (const value of memory.values()) {
    sum += value;
  }
  return sum;
};

/**
 * Part 1
 */
(async (filePath: string) => {
  const memory: Map<number, number> = new Map();

  let currentMask = "".padStart(NUMBER_WIDTH, "0");

  for await (const line of parseInputAsync(filePath)) {
    const [instruction, value] = line.split(" = ");

    if (instruction === "mask") {
      currentMask = value!;
      continue;
    }

    const position = Number(
      instruction!.match(/^mem\[(?<position>\d+)\]/)?.groups!.position!
    );

    const binaryValue = Number(value)
      .toString(2)
      .padStart(NUMBER_WIDTH, "0")
      .split("")
      .map(Number);

    const newBinaryValue = binaryValue
      .map((currentBit, index) =>
        currentMask[index] === "X" ? currentBit : currentMask[index]
      )
      .join("");

    memory.set(position, Number.parseInt(newBinaryValue, 2));
  }

  console.log(findSumOfMap(memory));
})(process.argv[2] ?? __dirname + "/input.txt");

/**
 * Part 2
 */
(async (filePath: string) => {
  const recursivelyReplaceX = (input: string): string[] => {
    if (!input.includes("X")) {
      return [input];
    }

    return ([] as string[]).concat(
      recursivelyReplaceX(input.replace("X", "0")),
      recursivelyReplaceX(input.replace("X", "1"))
    );
  };

  const memory: Map<number, number> = new Map();

  let currentMask = "".padStart(NUMBER_WIDTH, "0");

  for await (const line of parseInputAsync(filePath)) {
    const [instruction, value] = line.split(" = ");

    if (instruction === "mask") {
      currentMask = value!;
      continue;
    }

    const position = Number(
      instruction!.match(/^mem\[(?<position>\d+)\]/)?.groups!.position!
    );

    const positions = position
      .toString(2)
      .padStart(NUMBER_WIDTH, "0")
      .split("")
      .map((char, idx) => (currentMask[idx] === "0" ? char : currentMask[idx]))
      .join("");

    recursivelyReplaceX(positions)
      .map((v) => Number.parseInt(v, 2))
      .forEach((place) => memory.set(place, Number(value)));
  }

  console.log(findSumOfMap(memory));
})(process.argv[2] ?? __dirname + "/input.txt");
