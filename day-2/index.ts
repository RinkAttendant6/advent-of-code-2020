import * as readline from "readline";
import * as fs from "fs";

/**
 * Check if the password is compliant with policy 1
 * @param password Password
 * @param letter Desired letter
 * @param minOccurances Mininum occurances
 * @param maxOccurances Maximum occurances
 */
const isPolicy1Compliant = (
  password: string,
  letter: string,
  minOccurances: number,
  maxOccurances: number
): boolean => {
  const occurances = [...password].filter((char) => char === letter).length;

  return occurances >= minOccurances && occurances <= maxOccurances;
};

/**
 * Check if the password is compliant with policy 2
 * @param password Password
 * @param letter Desired letter
 * @param pos1 First position (1-indexed)
 * @param pos2 Second position (1-indexed)
 */
const isPolicy2Compliant = (
  password: string,
  letter: string,
  pos1: number,
  pos2: number
): boolean => {
  return (password[pos1 - 1] === letter) !== (password[pos2 - 1] === letter);
};

(async (filePath: string = __dirname + "/input.txt") => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  let validPasswordsPart1 = 0,
    validPasswordsPart2 = 0;

  for await (const line of rl) {
    const groups = line.match(
      /(?<min>\d+)-(?<max>\d+) (?<letter>[a-z]): (?<password>\w+)/i
    )?.groups!;

    const min = Number(groups.min),
      max = Number(groups.max),
      letter = groups.letter!,
      password = groups.password!;

    if (isPolicy1Compliant(password, letter, min, max)) {
      ++validPasswordsPart1;
    }

    if (isPolicy2Compliant(password, letter, min, max)) {
      ++validPasswordsPart2;
    }
  }

  console.log(validPasswordsPart1, validPasswordsPart2);
})(process.argv[2]);
