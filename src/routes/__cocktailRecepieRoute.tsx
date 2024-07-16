import { createRoute } from "@tanstack/react-router";
import rootRoute from "$routes/__root";
import CocktailRecepie from "$src/pages/CocktailRecepie";
import cocktailRecepieLoader from "$src/pages/CocktailRecepie/loader";

const cocktailRecepieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cocktail/$id",
  component: CocktailRecepie,
  loader: cocktailRecepieLoader,
});

export default cocktailRecepieRoute;
