import * as fs from "fs";
import * as readline from "readline";

(async (filePath: string = __dirname + "/input.txt") => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  const seats: number[] = [];

  for await (let line of rl) {
    line = line.replace(/[FL]/g, "0").replace(/[BR]/g, "1");

    const row = Number.parseInt(line.substr(0, 7), 2);
    const col = Number.parseInt(line.slice(-3), 2);
    const id = row * 8 + col;

    seats.push(id);
  }

  seats.sort((a, b) => a - b);

  const maxId = Math.max(...seats);
  const firstSeatId: number = seats[0]!;
  const firstGap = seats.find((id, index) => id - firstSeatId !== index);

  console.log(maxId, firstGap! - 1);
})(process.argv[2]);
