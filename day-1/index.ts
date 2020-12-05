import * as readline from "readline";
import * as fs from "fs";

/**
 * Reads numbers from a file by line
 * @param filePath Path to file
 */
const readInputFromFile = async (filePath: string): Promise<any[]> => {
  const output = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  for await (const line of rl) {
    output.push(Number(line));
  }

  return output;
};

(async (filePath: string = __dirname + "/input.txt") => {
  const numbers: number[] = await readInputFromFile(filePath);

  // Part 1
  for (let i = 0; i < numbers.length - 1; ++i) {
    let operand1: number = numbers[i]!;

    for (let j = i + 1; j < numbers.length; ++j) {
      let operand2: number = numbers[j]!;

      if (operand1 + operand2 === 2020) {
        console.log("%d * %d = %d", operand1, operand2, operand1 * operand2);
        break;
      }
    }
  }

  // Part 2
  for (let i = 0; i < numbers.length - 2; ++i) {
    let operand1: number = numbers[i]!;

    for (let j = i + 1; j < numbers.length - 1; ++j) {
      let operand2: number = numbers[j]!;

      for (let k = j + 1; k < numbers.length; ++k) {
        let operand3: number = numbers[k]!;

        if (operand1 + operand2 + operand3 === 2020) {
          console.log(
            "%d * %d * %d = %d",
            operand1,
            operand2,
            operand3,
            operand1 * operand2 * operand3
          );
          break;
        }
      }
    }
  }
})(process.argv[2]);
