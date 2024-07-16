import { RouterProvider } from "@tanstack/react-router";

import useCocktailsStorage from "$src/hooks/useCocktailsStorage";
import router from "$routes/router";

export function Root() {
  const cocktailsStorage = useCocktailsStorage();

  return (
    <RouterProvider
      router={router}
      context={{
        cocktails: cocktailsStorage,
      }}
    />
  );
}
