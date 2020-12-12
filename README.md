# Advent of Code 2020

Solutions to Advent of Code 2020 challenges.

## Install

Requirements: Node.js 14

Clone this repo and run `npm install`.

## Run

```bash
npm start <day>
```

This will execute the script with the default input set. Different input files can be placed in the `assets/data/` directory and specified as an additional argument:

```
npm start <day> <filename>
```

TypeScript files can be executed directly using [ts-node](https://www.npmjs.com/package/ts-node) if desired:

```
npx ts-node src/day-<day>/ <path to input file>
```
