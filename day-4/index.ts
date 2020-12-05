import * as fs from "fs";

/**
 * Determine if passport has all required fields
 * @param passport Passport data
 */
const isValidPassport1 = (passport: string): boolean =>
  [
    /\bbyr:/,
    /\biyr:/,
    /\beyr:/,
    /\bhgt:/,
    /\bhcl:/,
    /\becl:/,
    /\bpid:/,
  ].every((regex) => regex.test(passport));

/**
 * Determine if passport has all required fields with valid values
 * @param passport Passport data
 */
const isValidPassport2 = (passport: string): boolean =>
  [
    /\bbyr:(?:19[2-9]\d|200[0-2])\b/,
    /\biyr:20(?:1\d|20)\b/,
    /\beyr:20(?:2\d|30)\b/,
    /\bhgt:(?:1(?:[5-8]\d|9[0-3])cm|(?:59|6\d|7[0-6])in)\b/,
    /\bhcl:#[\da-f]{6}\b/,
    /\becl:(?:amb|blu|brn|gry|grn|hzl|oth)\b/,
    /\bpid:\d{9}\b/,
  ].every((regex) => regex.test(passport));

const data = fs.readFileSync(process.argv[2] || __dirname + "/input.txt", {
  encoding: "utf8",
});
const passports = data.split("\n\n");

const part1 = passports.filter(isValidPassport1).length;
const part2 = passports.filter(isValidPassport2).length;

console.log(part1, part2);
