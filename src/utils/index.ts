import { Cocktail, CocktailDto } from "$types/index";

export function convertCocktailDtoToCocktail(response: CocktailDto): Cocktail {
  const {
    idDrink: id,
    strDrink: name,
    strCategory: category,
    strAlcoholic: alcoholic,
    strGlass: glass,
    strInstructions: instructions,
    strDrinkThumb: thumbnail,
    strTags: tags,
    strVideo: video,
  } = response;

  const ingredients: Cocktail["ingredients"] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = response[`strIngredient${i}` as keyof CocktailDto];
    const measure = response[`strMeasure${i}` as keyof CocktailDto];

    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: measure || "",
      });
    }
  }

  return {
    id,
    name,
    category,
    alcoholic,
    glass,
    instructions,
    thumbnail,
    tags,
    video,
    ingredients,
  };
}

export function convertCocktailToCocktailDto(drink: Cocktail): CocktailDto {
  const {
    id,
    name,
    category,
    alcoholic,
    glass,
    instructions,
    thumbnail,
    tags,
    video,
    ingredients,
  } = drink;

  const response: Partial<CocktailDto> = {
    idDrink: id,
    strDrink: name,
    strCategory: category,
    strAlcoholic: alcoholic,
    strGlass: glass,
    strInstructions: instructions,
    strDrinkThumb: thumbnail,
    strTags: tags,
    strVideo: video,
  };

  ingredients.forEach((ingredient, index) => {
    response[`strIngredient${index + 1}` as keyof CocktailDto] =
      ingredient.name;
    response[`strMeasure${index + 1}` as keyof CocktailDto] =
      ingredient.measure;
  });

  return response as CocktailDto;
}
