import * as fs from "fs";

type ILayout = string[];

/**
 * Check if two layouts are the same
 * @param a Layout 1
 * @param b Layout 2
 */
const isSameLayout = (a: ILayout, b: ILayout): boolean =>
  a.every((el, idx) => b[idx] === el);

/**
 * Check if an adjacent seat is occupied on a layout
 * @param layout Layout
 * @param direction Relative direction to check
 * @param y
 * @param x
 */
const adjacentSeatOccupied = (
  layout: ILayout,
  y: number,
  x: number,
  dy: number,
  dx: number
): boolean => {
  const cY = y + dy;
  const cX = x + dx;

  if (cY < 0 || cX < 0 || cY >= layout.length || cX >= layout[0]!.length) {
    return false;
  }

  return layout[cY]![cX] === "#";
};

/**
 * Check if a visible seat is occupied on a given layout
 * @param layout Layout
 * @param direction Relative direction to check
 * @param y
 * @param x
 */
const visibleSeatOccupied = (
  layout: ILayout,
  y: number,
  x: number,
  dy: number,
  dx: number
): boolean => {
  const cY = y + dy;
  const cX = x + dx;

  if (
    cY < 0 ||
    cX < 0 ||
    cY >= layout.length ||
    cX >= layout[0]!.length ||
    layout[cY]![cX] === "L"
  ) {
    return false;
  }

  if (layout[cY]![cX] === "#") {
    return true;
  }

  return visibleSeatOccupied(layout, cY, cX, dy, dx);
};

/**
 * Determine a new layout
 * @param layout Current layout
 * @param threshold Number of surrounding occupied seats to cause seat to be empty
 * @param adjacentOnly Only consider adjacent seats
 */
const determineNewLayout = (
  layout: ILayout,
  threshold: number,
  adjacentOnly: boolean = false
): ILayout => {
  let newLayout: string[][] = [];

  for (let y = 0; y < layout.length; ++y) {
    const row = [];

    for (let x = 0; x < layout[y]!.length; ++x) {
      const seat = layout[y]![x]!;

      if (seat === ".") {
        row[x] = ".";
        continue;
      }

      let occupied = 0;

      for (let i = -1; i <= 1; ++i) {
        for (let j = -1; j <= 1; ++j) {
          if (i || j) {
            if (adjacentOnly) {
              occupied += adjacentSeatOccupied(layout, y, x, i, j) ? 1 : 0;
            } else {
              occupied += visibleSeatOccupied(layout, y, x, i, j) ? 1 : 0;
            }
          }
        }
      }

      if (occupied >= threshold) {
        row[x] = "L";
      } else if (occupied === 0) {
        row[x] = "#";
      } else {
        row[x] = seat;
      }
    }

    newLayout[y] = row;
  }

  return newLayout.map((el) => el.join(""));
};

/**
 * Count the number of occupied seats in a layout
 * @param layout Layout
 */
const countOccupiedSeats = (layout: ILayout): number => {
  return layout.reduce(
    (seats, row) => seats + [...row].filter((seat) => seat === "#").length,
    0
  );
};

const data: ILayout = fs
  .readFileSync(process.argv[2] || __dirname + "/input.txt", {
    encoding: "utf8",
  })
  .trim()
  .split("\n");

const results1: ILayout[] = [data];

do {
  results1.push(determineNewLayout(results1[results1.length - 1]!, 4, true));
} while (
  !isSameLayout(results1[results1.length - 1]!, results1[results1.length - 2]!)
);

console.log(countOccupiedSeats(results1[results1.length - 1]!));

const results2: ILayout[] = [data];

do {
  results2.push(determineNewLayout(results2[results2.length - 1]!, 5));
} while (
  !isSameLayout(results2[results2.length - 1]!, results2[results2.length - 2]!)
);

console.log(countOccupiedSeats(results2[results2.length - 1]!));
