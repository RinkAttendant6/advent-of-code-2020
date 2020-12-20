import { parseInputMultipart } from "../shared/utils.js";

const groups = parseInputMultipart(process.argv[2] ?? __dirname + "/input.txt");

// Unique union set of answers for entire group
const part1: number = groups
  .map((answers: string[]): number => {
    return new Set(answers.join("")).size;
  })
  .reduce((acc, v) => acc + v, 0);

// Unique intersection set of answers for entire group
const part2: number = groups
  .map((answers: string[]): number => {
    const commonAnswers = [...answers[0]!]
      .filter((letter) => answers.every((answer) => answer.includes(letter)))
      .flat();

    return new Set(commonAnswers).size;
  })
  .reduce((acc, v) => acc + v, 0);

console.log(part1, part2);
