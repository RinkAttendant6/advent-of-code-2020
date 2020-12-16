import * as fs from "fs";

type Range = [number, number];

type Ticket = number[];

interface IRules {
  [key: string]: Array<Range>;
}

/**
 * Determine if the number is valid
 * @param num Number to check
 */
const isValidNumber = (num: number): boolean => {
  return Object.values(rules).some((values) => {
    return values.some(([min, max]) => num >= min && num <= max);
  });
};

/**
 * Find the rules that a given number is valid for
 * @param num Number to check
 */
const findValidKeys = (num: number): string[] => {
  let validKeys = [];

  for (let [key, values] of Object.entries(rules)) {
    if (values.some(([min, max]) => num >= min && num <= max)) {
      validKeys.push(key);
    }
  }

  return validKeys;
};

const data = fs
  .readFileSync(process.argv[2] ?? __dirname + "/input.txt", {
    encoding: "utf8",
  })
  .trim()
  .split("\n\n")
  .map((s) => s.split("\n"));

const [info, you, nearby] = data;

const rules: IRules = {};

info!.map((line) => {
  const [key, values] = line.split(": ");

  rules[key!] = values!
    .split(" or ")
    .map((range) => range.split("-").map(Number)) as Range[];
});

const nearbyTickets: Ticket[] = nearby!
  .slice(1)
  .map((ticket) => ticket.split(",").map(Number));

/**
 * Part 1
 */
const errorRate: number = nearbyTickets
  .filter((ticket) => ticket.some((num) => !isValidNumber(num)))
  .reduce(
    (sum, ticket) =>
      sum +
      ticket.filter((num) => !isValidNumber(num)).reduce((a, b) => a + b, 0),
    0
  );

/**
 * Part 2
 */

const allPossibleKeys = Object.keys(rules);
const numberOfFields = nearbyTickets[0]!.length;

const nearbyValidKeys = nearbyTickets
  .filter((ticket) => ticket.every((num) => isValidNumber(num)))
  .map((ticket) => ticket.map((num) => findValidKeys(num)));

let nearbyValidKeysIntersection = [];

for (let j = 0; j < numberOfFields; j++) {
  let possibleKeys = [...allPossibleKeys];

  for (let i = 0; i < nearbyValidKeys.length; i++) {
    possibleKeys = possibleKeys.filter((k) =>
      nearbyValidKeys[i]?.[j]?.includes(k)
    );
  }

  nearbyValidKeysIntersection[j] = possibleKeys;
}

let actualKeys: string[] = [];

while (nearbyValidKeysIntersection.some((keys) => keys.length > 0)) {
  const uniquePosition = nearbyValidKeysIntersection.findIndex(
    (keys) => keys.length === 1
  );

  actualKeys[uniquePosition] = nearbyValidKeysIntersection[
    uniquePosition
  ]!.pop()!;

  // Remove from remaining valid keys
  nearbyValidKeysIntersection = nearbyValidKeysIntersection.map((keys) =>
    keys.filter((key) => key !== actualKeys[uniquePosition])
  );
}

const yourTicket: Ticket = you![1]!.split(",").map(Number);

const product = yourTicket
  .filter((_, idx) => actualKeys[idx]?.startsWith("departure"))
  .reduce((acc, num) => acc * num, 1);

console.log(errorRate, product);
