import { parseInputAsync } from "../shared/utils.js";

interface Tile {
  x: number;
  y: number;
}

/**
 * Find adjacent tiles
 * @param tile
 */
const findAdjacentTiles = (tile: Tile): Tile[] => [
  { x: tile.x + 1, y: tile.y }, // e
  { x: tile.x - 1, y: tile.y }, // w
  { x: tile.x + 1, y: tile.y + 1 }, // ne
  { x: tile.x, y: tile.y + 1 }, // nw
  { x: tile.x, y: tile.y - 1 }, // se
  { x: tile.x - 1, y: tile.y - 1 }, //sw
];

/**
 * Serializes a tile
 * @param tile
 */
const normalizeTile = (tile: Tile): string => tile.x + " " + tile.y;

/**
 * Deserializes a tile
 * @param normalizedTile
 */
const denormalizeTile = (normalizedTile: string): Tile => {
  const [x, y] = normalizedTile.split(" ").map(Number);
  return { x: x!, y: y! };
};

(async (filePath: string) => {
  const tiles = new Set<string>();

  for await (const pattern of parseInputAsync(filePath)) {
    let tile: Tile = { x: 0, y: 0 };

    for (let i = 0; i < pattern.length; ++i) {
      let token = pattern[i]!;

      if (!["e", "w"].includes(token)) {
        token += pattern[++i];
      }

      switch (token) {
        case "e":
          ++tile.x;
          break;
        case "w":
          --tile.x;
          break;
        case "ne":
          ++tile.x;
          ++tile.y;
          break;
        case "nw":
          ++tile.y;
          break;
        case "se":
          --tile.y;
          break;
        case "sw":
          --tile.x;
          --tile.y;
          break;
      }
    }

    const normalizedTile = normalizeTile(tile);

    if (tiles.has(normalizedTile)) {
      tiles.delete(normalizedTile);
    } else {
      tiles.add(normalizedTile);
    }
  }

  console.log(tiles.size);

  for (let day = 1; day <= 100; ++day) {
    const tilesInScope = new Set<string>();

    // Find current black tiles and add all adjacent tiles
    tiles.forEach((normalizedTile) => {
      tilesInScope.add(normalizedTile);

      const currentTile = denormalizeTile(normalizedTile);

      findAdjacentTiles(currentTile).forEach((tile) =>
        tilesInScope.add(normalizeTile(tile))
      );
    });

    const newPattern = new Set<string>();

    tilesInScope.forEach((normalizedTile) => {
      const currentTile = denormalizeTile(normalizedTile);
      const adjacentTiles = findAdjacentTiles(currentTile);
      const adjacentBlackTiles = adjacentTiles.filter((tile) =>
        tiles.has(normalizeTile(tile))
      );

      if (tiles.has(normalizedTile)) {
        // tile is black
        // stays black if there is one adjacent black tile
        if (adjacentBlackTiles.length !== 0 && adjacentBlackTiles.length <= 2) {
          newPattern.add(normalizedTile);
        }
      } else if (adjacentBlackTiles.length === 2) {
        // tile is white and flipped to black if there are exactly two adjacent black tiles
        newPattern.add(normalizedTile);
      }
    });

    tiles = newPattern;
  }

  console.log(tiles.size);
})(process.argv[2] ?? __dirname + "/input.txt");
