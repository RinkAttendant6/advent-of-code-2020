import { parseInputAsync } from "../shared/utils.js";

type TokenList = Array<string | number>;

/**
 * Part 2: Evaluate an unparenthesized expression from left to right
 * @param tokens Tokens in expression
 */
const evaluateUnordered = (tokens: TokenList): number => {
  let result = Number(tokens[0]);

  for (let i = 2; i < tokens.length; i += 2) {
    const operator: string = String(tokens[i - 1]);
    const operand = Number(tokens[i]);

    switch (operator) {
      case "+":
        result += operand;
        break;
      case "*":
        result *= operand;
        break;
      default:
        throw new Error("invalid operator in expression");
    }
  }

  return result;
};

/**
 * Part 2: Evaluate an unparenthesized expression where addition takes precedence over multiplication
 * @param tokens Tokens in expression
 */
const evaluateAdditionPrecedence = (tokens: TokenList): number => {
  let expr = tokens.join("");

  expr = expr.replace(/\d+\+\d+(\+\d+)*/g, (match) => eval(match));

  return eval(expr);
};

(async (filePath: string) => {
  let sum1 = 0;
  let sum2 = 0;

  for await (const expression of parseInputAsync(filePath)) {
    // Add space around parentheses for easier token splitting
    const tokens: TokenList = expression
      .replace(/([()])/g, " $1 ")
      .trim()
      .split(/\s+/);

    const subexpressions1: TokenList[] = [[]];
    const subexpressions2: TokenList[] = [[]];

    let currentDepth = 0;

    tokens.forEach((token) => {
      switch (token) {
        case "(":
          subexpressions1.push([]);
          subexpressions2.push([]);
          currentDepth++;
          break;
        case ")":
          const expr1 = subexpressions1.pop()!;
          const expr2 = subexpressions2.pop()!;

          currentDepth--;

          const value1 = evaluateUnordered(expr1);
          const value2 = evaluateAdditionPrecedence(expr2);

          subexpressions1[currentDepth]!.push(value1);
          subexpressions2[currentDepth]!.push(value2);
          break;
        default:
          subexpressions1[currentDepth]!.push(token);
          subexpressions2[currentDepth]!.push(token);
      }
    });

    sum1 += evaluateUnordered(subexpressions1.pop()!);
    sum2 += evaluateAdditionPrecedence(subexpressions2.pop()!);
  }

  console.log("Part 1: %d", sum1);
  console.log("Part 2: %d", sum2);
})(process.argv[2] ?? __dirname + "/input.txt");
