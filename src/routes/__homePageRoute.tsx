import HomePage from "$src/pages/HomePage";
import { createRoute } from "@tanstack/react-router";
import rootRoute from "$routes/__root";
import HomePageLoader from "$src/pages/HomePage/loader";

const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  loader: HomePageLoader,
});

export default homePageRoute;
