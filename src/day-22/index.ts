import * as fs from "fs";

interface GameResult {
  winner: number;
  deck: number[];
}

type Deck = number[];

/**
 * Combat (part 1)
 * @param player1 Player 1 deck
 * @param player2 Player 2 deck
 */
const combat = (player1: Deck, player2: Deck): GameResult => {
  while (player1.length && player2.length) {
    const top1 = player1.shift()!;
    const top2 = player2.shift()!;

    if (top1 > top2) {
      player1.push(top1, top2);
    } else {
      player2.push(top2, top1);
    }
  }

  return {
    winner: player1.length > 0 ? 1 : 2,
    deck: player1.length > 0 ? player1 : player2,
  };
};

/**
 * Recursive combat (part 2)
 * @param player1 Player 1 deck
 * @param player2 Player 2 deck
 */
const recursiveCombat = (player1: Deck, player2: Deck): GameResult => {
  const cache1: string[] = [];
  const cache2: string[] = [];

  while (player1.length > 0 && player2.length > 0) {
    let roundWinner: number | null = null;

    const normalized1 = player1.join(" ");
    const normalized2 = player2.join(" ");

    if (cache1.includes(normalized1) || cache2.includes(normalized2)) {
      return {
        winner: 1,
        deck: player1,
      };
    }

    cache1.push(normalized1);
    cache2.push(normalized2);

    const top1 = player1.shift()!;
    const top2 = player2.shift()!;

    if (player1.length >= top1 && player2.length >= top2) {
      roundWinner = recursiveCombat(
        player1.slice(0, top1),
        player2.slice(0, top2)
      ).winner;
    } else {
      roundWinner = top1 > top2 ? 1 : 2;
    }

    if (roundWinner === 1) {
      player1.push(top1, top2);
    } else {
      player2.push(top2, top1);
    }
  }

  return {
    winner: player1.length > 0 ? 1 : 2,
    deck: player1.length > 0 ? player1 : player2,
  };
};

/**
 * Calculates the final score of a deck
 * @param deck Deck
 */
const calculateScore = (deck: Deck): number =>
  deck.reverse().reduce((acc, card, idx) => acc + card * (idx + 1), 0);

const [player1, player2] = fs
  .readFileSync(process.argv[2] ?? __dirname + "/input.txt", {
    encoding: "utf8",
  })
  .trim()
  .split("\n\n")
  .map((line) => {
    const [, ...cards] = line.split("\n");
    return cards.map(Number);
  });

console.time();
const part1 = combat([...player1!], [...player2!]);
console.timeEnd();

console.time();
const part2 = recursiveCombat([...player1!], [...player2!]);
console.timeEnd();

console.log(calculateScore(part1.deck), calculateScore(part2.deck));
