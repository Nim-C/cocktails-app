import { createRoute } from "@tanstack/react-router";
import rootRoute from "$routes/__root";
import CocktailRecepie from "$src/pages/CocktailRecepie";
import cocktailRecepieLoader from "$src/pages/CocktailRecepie/loader";
import { URL_COCKTAIL_BY_ID } from "$src/constants";

const cocktailRecepieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: URL_COCKTAIL_BY_ID,
  component: CocktailRecepie,
  loader: cocktailRecepieLoader,
});

export default cocktailRecepieRoute;
