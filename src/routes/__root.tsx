import App from "$src/App";
import useCocktailsStorage from "$src/hooks/useCocktailsStorage";
import { createRootRouteWithContext } from "@tanstack/react-router";

export interface CocktailsContext {
  cocktails: ReturnType<typeof useCocktailsStorage>;
}

const rootRoute = createRootRouteWithContext<CocktailsContext>()({
  component: App,
});

export default rootRoute;
