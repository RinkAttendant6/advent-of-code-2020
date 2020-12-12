import { parseNumericInput } from "../shared/utils.js";

interface IEdgeList {
  [key: number]: number[];
}

const data = parseNumericInput(process.argv[2] ?? __dirname + "/input.txt");

const numbers = [0, ...data];
const max = Math.max(...numbers);
const deviceJoltage = max + 3;

numbers.sort((a, b) => a - b);

// Part 1 - count distribution of joltage differences
// Last adapter to device is always 3 jolts, it has been initialized to 1

const differences: [number, number, number, number] = [0, 0, 0, 1];

for (let i = 1; i < numbers.length; ++i) {
  ++differences[numbers[i]! - numbers[i - 1]!];
}

const part1 = differences[1] * differences[3];

// Part 2 - count different combinations of adapters

const edgeList: IEdgeList = {};

numbers.forEach((num) => {
  edgeList[num] = [];

  for (let i = 1; i <= 3; ++i) {
    if (numbers.includes(num + i)) {
      edgeList[num]!.push(num + i);
    }
  }
});

edgeList[max] = [deviceJoltage];

let cache: { [key: number]: number } = {};

/**
 * Traverse directed acyclic graph with given edgelist
 * @param node Node to traverse
 */
const traverseDirectedAcyclicGraph = (
  edgeList: IEdgeList,
  node: number = 0
): number => {
  if (node === max) {
    return 1;
  }

  if (!(node in cache)) {
    cache[node] = edgeList[node]!.reduce(
      (sum, edge) => sum + traverseDirectedAcyclicGraph(edgeList, edge),
      0
    );
  }

  return cache[node]!;
};

const part2 = traverseDirectedAcyclicGraph(edgeList);

console.log(part1, part2);
