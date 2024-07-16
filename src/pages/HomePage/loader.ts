import { getRandomCocktails } from "$src/api";
import { RANDOM_COCKTAILS_COUNT } from "$src/constants";
import { CocktailsContext } from "$src/routes/__root";
import {
  convertCocktailDtoToCocktail,
  convertCocktailToCocktailDto,
} from "$src/utils/index";
import { LoaderFnContext } from "@tanstack/react-router";

const HomePageLoader = async ({
  context: {
    cocktails: { storedCocktails, saveCocktails },
  },
}: LoaderFnContext<
  Record<never, string>,
  NonNullable<unknown>,
  CocktailsContext
>) => {
  let randomCocktails = storedCocktails.map(convertCocktailDtoToCocktail);

  if (!randomCocktails.length) {
    randomCocktails = await getRandomCocktails(RANDOM_COCKTAILS_COUNT);
    saveCocktails(randomCocktails.map(convertCocktailToCocktailDto));
  }

  return randomCocktails;
};

export default HomePageLoader;
