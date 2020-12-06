import * as fs from "fs";

const filePath: string = process.argv[2] ?? __dirname + "/input.txt";

const groups: string[] = fs
  .readFileSync(filePath, { encoding: "utf8" })
  .trim()
  .split("\n\n");

const part1: number = groups
  .map((group: string): number => new Set([...group.replace(/\n/g, "")]).size)
  .reduce((acc, v) => acc + v, 0);

const part2: number = groups
  .map((group: string): number => {
    const answers = group.split("\n");
    const commonAnswers = [...answers[0]!]
      .filter((letter) => answers.every((answer) => answer.includes(letter)))
      .flat();

    return new Set(commonAnswers).size;
  })
  .reduce((acc, v) => acc + v, 0);

console.log(part1, part2);
