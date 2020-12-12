import { parseInputAsync } from "../shared/utils.js";

enum Direction {
  North,
  East,
  South,
  West,
}

enum Instruction {
  North = "N",
  East = "E",
  South = "S",
  West = "W",
  Forward = "F",
  TurnLeft = "L",
  TurnRight = "R",
}

/**
 * Part 1
 */
(async (filePath: string) => {
  let x = 0;
  let y = 0;
  let direction: Direction = Direction.East;

  for await (const line of parseInputAsync(filePath)) {
    const instruction = line[0] as Instruction;
    const units = Number(line.slice(1));

    switch (instruction) {
      case Instruction.North:
        y += units;
        break;
      case Instruction.East:
        x += units;
        break;
      case Instruction.South:
        y -= units;
        break;
      case Instruction.West:
        x -= units;
        break;
      case Instruction.Forward:
        switch (direction) {
          case Direction.North:
            y += units;
            break;
          case Direction.East:
            x += units;
            break;
          case Direction.South:
            y -= units;
            break;
          case Direction.West:
            x -= units;
            break;
        }
        break;
      case Instruction.TurnLeft:
        direction = (((direction - units / 90) % 4) + 4) % 4;
        break;
      case Instruction.TurnRight:
        direction = (direction + units / 90) % 4;
        break;
      default:
        throw new Error("Invalid instruction");
    }
  }

  console.log(Math.abs(x) + Math.abs(y));
})(process.argv[2] ?? __dirname + "/input.txt");

/**
 * Part 2
 */
(async (filePath: string) => {
  let x = 0;
  let y = 0;
  let wx = 10;
  let wy = 1;

  for await (const line of parseInputAsync(filePath)) {
    const instruction = line[0] as Instruction;
    const units = Number(line.slice(1));

    switch (instruction) {
      case Instruction.North:
        wy += units;
        break;
      case Instruction.East:
        wx += units;
        break;
      case Instruction.South:
        wy -= units;
        break;
      case Instruction.West:
        wx -= units;
        break;
      case Instruction.Forward:
        x += wx * units;
        y += wy * units;
        break;
      case Instruction.TurnLeft:
        switch (units / 90) {
          case 1:
            [wx, wy] = [-wy, wx];
            break;
          case 2:
            [wx, wy] = [-wx, -wy];
            break;
          case 3:
            [wx, wy] = [wy, -wx];
            break;
        }
        break;
      case Instruction.TurnRight:
        switch (units / 90) {
          case 1:
            [wx, wy] = [wy, -wx];
            break;
          case 2:
            [wx, wy] = [-wx, -wy];
            break;
          case 3:
            [wx, wy] = [-wy, wx];
            break;
        }
        break;
      default:
        throw new Error("Invalid instruction");
    }
  }

  console.log(Math.abs(x) + Math.abs(y));
})(process.argv[2] ?? __dirname + "/input.txt");
