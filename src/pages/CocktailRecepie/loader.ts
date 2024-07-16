import { lookupCocktailById } from "$src/api";

async function cocktailRecepieLoader({ params }: { params: { id: string } }) {
  return await lookupCocktailById(params.id);
}

export default cocktailRecepieLoader;
