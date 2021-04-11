"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpressServer = void 0;
const Server = require("express");
const BodyParser = require("body-parser");
const CORS = require("cors");
function createExpressServer(router) {
    const app = Server();
    app.disable("x-powered-by");
    app.use(CORS());
    app.use((_request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use("/rest/v1/", Server.static("public"));
    app.use(router);
    return app;
}
exports.createExpressServer = createExpressServer;
