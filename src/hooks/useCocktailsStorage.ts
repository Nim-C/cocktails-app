import { LOCAL_STORAGE_COCKTAILS_KEY } from "$src/constants";
import useLocalStorageCollection from "$hooks/localStorageCollection";
import { CocktailDto } from "$src/types";

const useCocktailsStorage = () => {
  const [storedCocktails, saveCocktails, saveNewCocktail] =
    useLocalStorageCollection<CocktailDto>(LOCAL_STORAGE_COCKTAILS_KEY, []);

  return { storedCocktails, saveCocktails, saveNewCocktail };
};

export default useCocktailsStorage;
