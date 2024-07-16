type CocktailsData<T> = {
  drinks: T;
};

export type CocktailDto = {
  idDrink: string;
  strDrink: string;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
};

export type Ingredient = {
  name: string;
  measure: string;
};

export type Cocktail = {
  id: DrinkResponse["idDrink"];
  name: DrinkResponse["strDrink"];
  category: DrinkResponse["strCategory"];
  alcoholic: DrinkResponse["strAlcoholic"];
  glass: DrinkResponse["strGlass"];
  instructions: DrinkResponse["strInstructions"];
  thumbnail: DrinkResponse["strDrinkThumb"];
  tags: DrinkResponse["strTags"];
  video: DrinkResponse["strVideo"];
  ingredients: Ingredient[];
};

export type CocktailsFetch = CocktailsData<CocktailDto[]>;
export type RandomCocktailsFetch = CocktailsData<CocktailDto[]>;

// export interface TypeCocktailStorageContext {
//   storedCocktails: CocktailDto[];
//   saveCocktails: (newCocktail: CocktailDto[]) => void;
//   saveNewCocktail: (newCocktail: CocktailDto) => void;
// }
