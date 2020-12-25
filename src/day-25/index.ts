import * as fs from "fs";

const determineLoopSize = (target: number, pk: number = 7): number => {
  let i = 0;

  for (let value = 1; value !== target; ++i) {
    value = (value * pk) % 20201227;
  }

  return i;
};

const determineEncryptionKey = (loops: number, pk: number): number => {
  let value = 1;

  for (let i = 0; i < loops; ++i) {
    value = (value * pk) % 20201227;
  }

  return value;
};

const [card, door] = fs
  .readFileSync(process.argv[2] ?? __dirname + "/input.txt", {
    encoding: "utf8",
  })
  .trim()
  .split("\n")
  .map(Number);

const cardLoop = determineLoopSize(card!);
const doorLoop = determineLoopSize(door!);

const ek1 = determineEncryptionKey(doorLoop, card!);
const ek2 = determineEncryptionKey(cardLoop, door!);

console.log(ek1, ek2);
