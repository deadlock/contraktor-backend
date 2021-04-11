"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPartsRouter = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
const index_1 = require("../../database/index");
const middlewares_1 = require("./middlewares");
function createPartsRouter() {
    return express_1.Router()
        .get("/part/:document", [middlewares_1.validateGet], (request, response) => {
        response.json(index_1.default.get("parts").find({ document: request.params.document }).value());
    })
        .post("/part", [middlewares_1.validatePost], (request, response) => {
        index_1.default.get("parts")
            .push(Object.assign({ id: uuid_1.v4() }, request.body))
            .write();
        response.status(200).json({ message: "Part registered" });
    })
        .put("/part/:id", [middlewares_1.validatePut], (request, response) => {
        index_1.default.get("parts")
            .find({ id: request.params.id })
            .assign(request.body)
            .write();
        response.sendStatus(204);
    })
        .delete("/part/:id", [middlewares_1.validateDelete], (request, response) => {
        index_1.default.get("parts").remove({ id: request.params.id }).write();
        response.sendStatus(204);
    });
}
exports.createPartsRouter = createPartsRouter;
