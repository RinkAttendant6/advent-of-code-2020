import * as fs from "fs";

interface IResult {
  condition: "outOfBounds" | "loop";
  value: number;
}

/**
 * Evaluate a set of instructions in a finite manner
 * @param instructions Instruction set
 */
const finitelyEvaluate = (instructions: string[]): IResult => {
  let accumulator = 0,
    pointer = 0,
    history = [];

  while (true) {
    const [instruction, value]: string[] = instructions[pointer]!.split(" ");

    history.push(pointer);

    switch (instruction) {
      case "jmp":
        pointer += Number(value);
        break;
      case "nop":
        pointer += 1;
        break;
      case "acc":
        accumulator += Number(value);
        pointer += 1;
        break;
    }

    if (pointer < 0 || pointer >= instructions.length) {
      return { condition: "outOfBounds", value: accumulator };
    }

    if (history.includes(pointer)) {
      return { condition: "loop", value: accumulator };
    }
  }
};

const lines: string[] = fs
  .readFileSync(process.argv[2] || __dirname + "/input.txt", {
    encoding: "utf8",
  })
  .split("\n");

// Part 1
console.log(finitelyEvaluate(lines).value);

// Part 2
for (let i = 0; i < lines.length; ++i) {
  const line = lines[i]!;

  if (line.startsWith("acc")) {
    continue;
  }

  let copyOfLines = [...lines];

  if (line.startsWith("jmp")) {
    copyOfLines[i] = line.replace(/jmp/, "nop");
  } else if (line.startsWith("nop")) {
    copyOfLines[i] = line.replace(/nop/, "jmp");
  }

  let result = finitelyEvaluate(copyOfLines);

  if (result.condition === "outOfBounds") {
    console.log(result.value);
    break;
  }
}
