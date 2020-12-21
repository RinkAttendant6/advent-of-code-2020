import * as fs from "fs";

enum Edge {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
}

/**
 * Class representing a tile's properties
 */
class Tile {
  id: number;
  #raw: string[];

  edges: {
    [Edge.Top]: string;
    [Edge.Right]: string;
    [Edge.Bottom]: string;
    [Edge.Left]: string;
  };

  edgesFlipped: {
    [Edge.Top]: string;
    [Edge.Right]: string;
    [Edge.Bottom]: string;
    [Edge.Left]: string;
  };

  adjacent: Map<Edge, number>;

  constructor(id: number, tileData: string[]) {
    this.id = Number(id);
    this.#raw = tileData;
    this.adjacent = new Map();

    this.edges = {
      [Edge.Top]: tileData[0]!,
      [Edge.Bottom]: tileData[tileData.length - 1]!,
      [Edge.Left]: tileData.map((line) => line[0]).join(""),
      [Edge.Right]: tileData.map((line) => line[line.length - 1]).join(""),
    };

    this.edgesFlipped = {
      [Edge.Top]: [...this.edges[Edge.Top]].reverse().join(""),
      [Edge.Right]: [...this.edges[Edge.Right]].reverse().join(""),
      [Edge.Bottom]: [...this.edges[Edge.Bottom]].reverse().join(""),
      [Edge.Left]: [...this.edges[Edge.Left]].reverse().join(""),
    };
  }

  /**
   * Find tiles adjacent to this tile
   * @param tileset Set of tiles to look through
   */
  computeAdjacent(tileset: Tile[]) {
    for (const [edge, value] of Object.entries(this.edges)) {
      const adjacent = tileset.find(
        (neighbour) =>
          neighbour.id !== this.id &&
          (Object.values(neighbour.edges).includes(value) ||
            Object.values(neighbour.edgesFlipped).includes(value))
      );

      if (adjacent) {
        this.adjacent.set(edge as Edge, adjacent.id);
      }
    }
  }

  get pattern() {
    return this.#raw;
  }
}

const data = fs
  .readFileSync(process.argv[2] ?? __dirname + "/input.txt", {
    encoding: "utf8",
  })
  .trim()
  .split("\n\n");

const tiles = data.map((rawTile) => {
  const [id, ...tile] = rawTile.split("\n");
  const idNumber = Number.parseInt(id!.slice(5), 10);

  return new Tile(idNumber, tile);
});

tiles.forEach((tile) => tile.computeAdjacent(tiles));

const cornerTiles = tiles.filter((tile) => tile.adjacent.size === 2);
const part1 = cornerTiles.reduce((acc, tile) => acc * tile.id, 1);

console.log(part1);
