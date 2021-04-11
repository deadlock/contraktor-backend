"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpressRouter = exports.createRouter = void 0;
const express_1 = require("express");
const routes_1 = require("../controllers/contracts/routes");
const routes_2 = require("../controllers/parts/routes");
function createRouter(routers) {
    return routers.reduce((previous, current) => previous.use(current), express_1.Router());
}
exports.createRouter = createRouter;
function createExpressRouter() {
    const routes = createRouter([routes_1.createContractRouter(), routes_2.createPartsRouter()]);
    return express_1.Router().use("/rest/v1/", routes);
}
exports.createExpressRouter = createExpressRouter;
