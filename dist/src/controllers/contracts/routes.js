"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContractRouter = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
const index_1 = require("../../database/index");
const path = require("path");
const middlewares_1 = require("./middlewares");
function createContractRouter() {
    return express_1.Router()
        .get("/contract/file", (_, response) => {
        var options = {
            root: path.resolve(__dirname, "../../../public"),
            dotfiles: "deny",
            headers: {
                "x-timestamp": Date.now(),
                "x-sent": true,
            },
        };
        response.sendFile("modelo.pdf", options);
    })
        .get("/contract/:title", (request, response) => {
        response.json(index_1.default.get("contracts").find({ title: request.params.title }).value());
    })
        .post("/contract", [middlewares_1.validatePost], (request, response) => {
        let contract = request.body;
        const parts = request.body.parts;
        if (!parts) {
            contract = Object.assign(Object.assign({}, contract), { parts: [] });
        }
        index_1.default.get("contracts")
            .push(Object.assign({ id: uuid_1.v4() }, contract))
            .write();
        response.status(200).json({ message: "Contract registered" });
    })
        .put("/contract", [middlewares_1.validatePut], (request, response) => {
        const contract = index_1.default
            .get("contracts")
            .find({ title: request.body.contractTitle })
            .value();
        console.log("CONTRACT FOUND", contract);
        const part = index_1.default
            .get("parts")
            .find({ document: request.body.partDocument })
            .value();
        console.log("PART FOUND", part);
        index_1.default.get("contracts")
            .find({ title: request.body.contractTitle })
            .assign({ parts: contract.parts.concat(part) })
            .write();
        response.sendStatus(204);
    })
        .delete("/contract/:id", [middlewares_1.validateDelete], (request, response) => {
        index_1.default.get("contracts").remove({ id: request.params.id.toString() }).write();
        response.sendStatus(204);
    });
}
exports.createContractRouter = createContractRouter;
