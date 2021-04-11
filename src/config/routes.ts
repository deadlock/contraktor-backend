import { Router } from "express";

import { createContractRouter } from "../controllers/contracts/routes";
import { createPartsRouter } from "../controllers/parts/routes";
export function createRouter(routers: Router[]): Router {
  return routers.reduce(
    (previous: Router, current: Router) => previous.use(current),
    Router()
  );
}
export function createExpressRouter(): Router {
  const routes = createRouter([createContractRouter(), createPartsRouter()]);

  return Router().use("/rest/v1/", routes);
}
