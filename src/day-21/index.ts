import { parseInput } from "../shared/utils.js";

const uniqueIngredients: Set<string> = new Set();
const potentiallyDangerousIngredients: { [key: string]: string[][] } = {};
const dangerousIngredients: Map<string, string[]> = new Map();

const data = parseInput(process.argv[2] ?? __dirname + "/input.txt");

// Build list of potentially dangerous ingredients
for (const food of data) {
  const [ingredientList, allergenList] = food.slice(0, -1).split(" (contains ");

  const ingredients = ingredientList!.split(" ");

  for (const allergen of allergenList!.split(", ")) {
    if (!(allergen in potentiallyDangerousIngredients)) {
      potentiallyDangerousIngredients[allergen] = [];
    }

    potentiallyDangerousIngredients[allergen]!.push(ingredients);
  }

  ingredients.forEach((ingredient) => uniqueIngredients.add(ingredient));
}

// Determine intersection of potentially dangerous ingredients
for (const [allergen, ingredientLists] of Object.entries(
  potentiallyDangerousIngredients
)) {
  dangerousIngredients.set(
    allergen,
    ingredientLists[0]!.filter((ingredient) =>
      ingredientLists.every((list) => list.includes(ingredient))
    )
  );
}

const uniqueDangerousIngredients = new Set(
  [...dangerousIngredients.values()].flat()
);

const safeIngredients = new Set(
  [...uniqueIngredients].filter(
    (ingredient) => !uniqueDangerousIngredients.has(ingredient)
  )
);

const allergenIngredientMap: { [key: string]: string } = {};

// Determine the unique ingredient that contains each allergen
while (dangerousIngredients.size > 0) {
  for (const [allergen, ingredients] of dangerousIngredients.entries()) {
    if (ingredients.length === 1) {
      const activeIngredient = ingredients[0]!;
      allergenIngredientMap[allergen] = activeIngredient;

      dangerousIngredients.delete(allergen);

      for (const [key, value] of dangerousIngredients.entries()) {
        dangerousIngredients.set(
          key,
          value.filter((ingredient) => ingredient !== activeIngredient)
        );
      }
    }
  }
}

const occurrencesOfSafeIngredients = data.flatMap((food) =>
  food
    .split(" (contains ")[0]!
    .split(" ")
    .filter((i) => safeIngredients.has(i))
).length;

const canonicalDangerousList = Object.keys(allergenIngredientMap)
  .sort()
  .map((key) => allergenIngredientMap[key])
  .join(",");

console.log(occurrencesOfSafeIngredients);
console.log(canonicalDangerousList);
