import { Router } from "express";
import { v4 as uuid } from "uuid";
import db from "../../database/index";
import * as path from "path";
import { validateDelete, validatePost, validatePut } from "./middlewares";

export function createContractRouter(): Router {
  return Router()
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
      response.json(
        db.get("contracts").find({ title: request.params.title }).value()
      );
    })
    .post("/contract", [validatePost], (request, response) => {
      let contract = request.body;
      const parts = request.body.parts;

      if (!parts) {
        contract = {
          ...contract,
          parts: [],
        };
      }

      db.get("contracts")
        .push({ id: uuid(), ...contract })
        .write();
      response.status(200).json({ message: "Contract registered" });
    })
    .put("/contract", [validatePut], (request, response) => {
      const contract = db
        .get("contracts")
        .find({ title: request.body.contractTitle })
        .value();

      console.log("CONTRACT FOUND", contract);

      const part = db
        .get("parts")
        .find({ document: request.body.partDocument })
        .value();
      console.log("PART FOUND", part);

      db.get("contracts")
        .find({ title: request.body.contractTitle })
        .assign({ parts: contract.parts.concat(part) })
        .write();
      response.sendStatus(204);
    })
    .delete("/contract/:id", [validateDelete], (request, response) => {
      db.get("contracts").remove({ id: request.params.id.toString() }).write();
      response.sendStatus(204);
    });
}
