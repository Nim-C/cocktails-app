import { CocktailCreate } from "$src/pages/CocktailCreate";
import { createRoute } from "@tanstack/react-router";
import rootRoute from "$routes/__root";
import { URL_CREATE } from "$src/constants";

const cocktailCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: URL_CREATE,
  component: CocktailCreate,
});

export default cocktailCreateRoute;
