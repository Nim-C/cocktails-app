import { createRouter } from "@tanstack/react-router";

import rootRoute from "$routes/__root";
import cocktailCreateRoute from "$routes/__cocktailCreateRoute";
import cocktailRecepieRoute from "$routes/__cocktailRecepieRoute";
import homePageRoute from "$routes/__homePageRoute";
import notFoundRoute from "$routes/__notFoundRoute";

const routeTree = rootRoute.addChildren([
  homePageRoute,
  cocktailRecepieRoute,
  cocktailCreateRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree, context: { cocktails: undefined! } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
