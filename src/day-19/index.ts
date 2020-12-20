import { parseInputMultipart } from "../shared/utils.js";

type Token = string | number;
type Rule = Array<Token>;

/**
 * Expand a rule into a regular expression string
 * @param rule
 */
const expand = (rule: Rule): string => {
  return rule
    .map((token) => {
      if (typeof token === "string") {
        return token;
      }

      const thisRules = ruleSet[token]!;

      if (thisRules.length === 1) {
        return expand(thisRules[0]!);
      }

      const expansion = thisRules.map(expand);

      return expansion.every((token) => token.length === 1)
        ? "[" + expansion.join("") + "]"
        : "(?:" + expansion.join("|") + ")";
    })
    .join("");
};

/**
 * Get messages that match a given regular expression
 * @param regexString Regex
 * @param messages Messages to check
 */
const part1 = (regexString: string, messages: string[]): string[] => {
  const regex = new RegExp("^" + regexString + "$");

  return messages.filter((msg) => regex.test(msg));
};

/**
 * Get messages that begin with a given regular expression followed by a balanced number of characters matching the first and second regular expression
 * @param leftRegexString Prefix
 * @param balancedGroupString1 Left regular expression
 * @param balancedGroupString2 Right regular expression
 * @param messages Messages to check
 */
const part2 = (
  leftRegexString: string,
  balancedGroupString1: string,
  balancedGroupString2: string,
  messages: string[]
): string[] => {
  return messages.filter((msg) => {
    for (let depth = 1; depth < 10; ++depth) {
      const rx = new RegExp(
        "^" +
          leftRegexString +
          "+?" +
          balancedGroupString1.repeat(depth) +
          balancedGroupString2.repeat(depth) +
          "$"
      );

      if (rx.test(msg)) {
        return true;
      }
    }

    return false;
  });
};

const [rules, messages] = parseInputMultipart(
  process.argv[2] ?? __dirname + "/input.txt"
);

const ruleSet: Rule[][] = [];

rules!.forEach((rule) => {
  const [id, values] = rule.split(":");

  ruleSet[Number(id)] = values!.split("|").map(
    (groups: string): Rule =>
      groups
        .trim()
        .split(" ")
        .map(
          (value): Token =>
            /\d+/.test(value) ? Number(value) : value.replace(/"/g, "")
        )
  );
});

console.log(
  part1(expand(ruleSet[0]![0]!), messages!).length,
  part2(expand([ruleSet[0]![0]![0]!]), expand([42]), expand([31]), messages!)
    .length
);
