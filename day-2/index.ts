import * as readline from "readline";
import * as fs from "fs";

(async (filePath: string) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  let validPasswordsPart1 = 0,
    validPasswordsPart2 = 0;

  for await (const line of rl) {
    let [range, letter, password]: string[] = line.split(" ");
    letter = letter![0];
    const [min, max]: number[] = range!.split("-").map(Number);

    // Part 1
    const countOfDesiredLetter: number = password!
      .split("")
      .filter((currentLetter) => currentLetter === letter).length;
    if (countOfDesiredLetter >= min! && countOfDesiredLetter <= max!) {
      ++validPasswordsPart1;
    }

    // Part 2
    const position1 = password![min! - 1] === letter,
      position2 = password![max! - 1] === letter;
    if ((position1 && !position2) || (!position1 && position2)) {
      ++validPasswordsPart2;
    }
  }

  console.log(validPasswordsPart1, validPasswordsPart2);
})(__dirname + "/input.txt");
