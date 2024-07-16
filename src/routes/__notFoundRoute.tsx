import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "$routes/__root";
import { URL_HOME } from "$src/constants";

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <div>404 Not Found</div>,
  beforeLoad: () => {
    throw redirect({
      to: URL_HOME,
      replace: true,
    });
  },
});

export default notFoundRoute;
