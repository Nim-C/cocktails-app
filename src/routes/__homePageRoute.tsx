import HomePage from "$src/pages/HomePage";
import { createRoute } from "@tanstack/react-router";
import rootRoute from "$routes/__root";
import HomePageLoader from "$src/pages/HomePage/loader";
import { URL_HOME } from "$src/constants";

const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: URL_HOME,
  component: HomePage,
  loader: HomePageLoader,
});

export default homePageRoute;
