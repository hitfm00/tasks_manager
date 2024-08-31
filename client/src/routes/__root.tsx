import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { MainLayout } from "../layouts/MainLayout";


const TanStackRouterDevtools =
  import.meta.env.MODE === "production"
    ? () => null
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </React.Fragment>
  ),
});
