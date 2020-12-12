import { parseNumericInput } from "../shared/utils.js";

const numbers = parseNumericInput(process.argv[2] ?? __dirname + "/input.txt");

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
