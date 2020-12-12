const child_process = require("child_process");
const path = require("path");

const day = process.argv[2];
const inputFile = process.argv[3] ?? `day-${day}.txt`;
const inputPath = path.join(__dirname, "assets", "data", inputFile);

child_process.spawn("npx", ["ts-node", `src/day-${day}`, inputPath], {
  shell: true,
  stdio: "inherit",
});
