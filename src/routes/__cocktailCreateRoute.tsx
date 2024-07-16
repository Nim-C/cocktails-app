import { CocktailCreate } from "$src/pages/CocktailCreate";
import { createRoute } from "@tanstack/react-router";
import rootRoute from "$routes/__root";

const cocktailCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: CocktailCreate,
});

export default cocktailCreateRoute;
