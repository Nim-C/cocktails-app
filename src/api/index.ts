import { CocktailsFetch, RandomCocktailsFetch, Cocktail } from "$types/index";

import { cocktailDbFetch } from "$api/services/cocktailDb";
import { convertCocktailDtoToCocktail } from "$utils/index";
import {
  getLocalStorageCocktailById,
  getLocalStorageCocktailByName,
} from "$src/utils/storage";

export async function getRandomCocktail(): Promise<RandomCocktailsFetch> {
  return await cocktailDbFetch<RandomCocktailsFetch>(`/random.php`);
}

async function fetchRandomCocktails(cocktailsCount: number) {
  const requests = Array(cocktailsCount)
    .fill(null)
    .map(() => getRandomCocktail());
  return (await Promise.all(requests)).flat();
}

export async function getRandomCocktails(
  cocktailsCount: number
): Promise<Cocktail[]> {
  // Ensure that we get unique cocktails
  const uniqueCocktails = new Set<string>();
  while (uniqueCocktails.size < cocktailsCount) {
    const cocktails = await fetchRandomCocktails(
      cocktailsCount - uniqueCocktails.size
    );
    cocktails.forEach((cocktail) =>
      uniqueCocktails.add(JSON.stringify(cocktail))
    );
  }

  // Extract and return the unique cocktails
  return Array.from(uniqueCocktails)
    .map((cocktail) => JSON.parse(cocktail).drinks[0])
    .map(convertCocktailDtoToCocktail);
}

export async function lookupCocktailById(id: string): Promise<Cocktail | null> {
  const storageCocktail = getLocalStorageCocktailById(id);
  if (storageCocktail) {
    return convertCocktailDtoToCocktail(storageCocktail);
  }

  const response = await cocktailDbFetch<CocktailsFetch>(`/lookup.php`, {
    params: { i: id },
  });
  return response ? convertCocktailDtoToCocktail(response.drinks[0]) : null;
}

export const searchCocktailsByName = async (
  name: string
): Promise<CocktailsFetch> => {
  if (!name) {
    return { drinks: [] };
  }
  const localStorageDrinks = getLocalStorageCocktailByName(name);

  const { drinks: apiResults } = await cocktailDbFetch<CocktailsFetch>(
    `/search.php`,
    {
      params: { s: name },
    }
  );
  return { drinks: [...localStorageDrinks, ...(apiResults ?? [])] };
};
