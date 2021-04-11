"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./src/config/routes");
const server_1 = require("./src/config/server");
const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || "development";
server_1.createExpressServer(routes_1.createExpressRouter())
    .listen(port)
    .once("listening", () => console.info("Server running", { port, environment }));
