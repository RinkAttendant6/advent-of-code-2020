import * as readline from "readline";
import * as fs from "fs";

const findTrees = async (
  filePath: string,
  right: number = 1,
  down: number = 1
): Promise<number> => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  let x = 0,
    y = 0,
    trees = 0;

  for await (const line of rl) {
    if (y % down === 0) {
      if (line[x % line.length] === "#") {
        ++trees;
      }

      x += right;
    }
    ++y;
  }

  return trees;
};

(async (filePath: string) => {
  let part1 = await findTrees(filePath, 3);
  console.log(part1);

  let part2: number[] = await Promise.all([
    findTrees(filePath),
    part1,
    findTrees(filePath, 5),
    findTrees(filePath, 7),
    findTrees(filePath, 1, 2),
  ]);

  console.debug(part2);
  console.log(part2.reduce((accumulator, value) => accumulator * value, 1));
})(__dirname + "/input.txt");
