import { parseInput } from "../shared/utils.js";

const findNextBus = (bus: number, time: number): number => {
  return time % bus ? (Math.floor(time / bus) + 1) * bus : time;
};

const [timestamp, busString] = parseInput(
  process.argv[2] ?? __dirname + "/input.txt"
);

const buses = busString!.split(",");

// Part 1

const [minWaitingTime, earliestBus]: [number, number] = buses
  .filter((bus) => bus !== "x")
  .map(Number)
  .reduce(
    (acc, bus) => {
      const waitingTime =
        findNextBus(bus, Number(timestamp)) - Number(timestamp);

      return waitingTime < acc[0] ? [waitingTime, bus] : acc;
    },
    [Infinity, 0]
  );

console.log(minWaitingTime * earliestBus!);
