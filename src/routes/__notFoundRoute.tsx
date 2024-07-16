import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "$routes/__root";

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <div>404 Not Found</div>,
  beforeLoad: () => {
    throw redirect({
      to: "/",
      replace: true,
    });
  },
});

export default notFoundRoute;
