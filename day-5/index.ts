import * as fs from "fs";
import * as readline from "readline";

(async (filePath: string) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  const seats: boolean[] = Array(128 * 8).fill(false);

  let max = 0;

  for await (let line of rl) {
    line = line.replace(/[FL]/g, "0").replace(/[BR]/g, "1");

    const row = Number.parseInt(line.substr(0, 7), 2);
    const col = Number.parseInt(line.slice(-3), 2);
    const id = row * 8 + col;

    seats![id] = true;

    max = Math.max(max, id);
  }

  console.log(max);

  for (let i = 0, firstSeatFound = false; i < seats.length; ++i) {
    firstSeatFound = firstSeatFound || seats[i]!;

    if (firstSeatFound && !seats[i]) {
      console.log(i);
      break;
    }
  }
})(__dirname + "/input.txt");
