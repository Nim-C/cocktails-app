import { CocktailDto } from "$src/types";

export function getLocalStorageCocktails(): CocktailDto[] {
  const cocktailsData = localStorage.getItem("cocktailsData");
  if (cocktailsData) {
    try {
      return JSON.parse(cocktailsData);
    } catch (error) {
      console.error("Error parsing cocktailsData from localStorage:", error);
    }
  }
  return [];
}
export function getLocalStorageCocktailByName(name: string): CocktailDto[] {
  const cocktailsData = getLocalStorageCocktails();
  return cocktailsData.filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(name.toLowerCase())
  );
}

export function getLocalStorageCocktailById(
  id: string
): CocktailDto | undefined {
  const cocktailsData = getLocalStorageCocktails();
  return cocktailsData.find((cocktail) => cocktail.idDrink === id);
}
