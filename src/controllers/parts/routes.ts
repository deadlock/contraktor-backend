import { Router } from "express";
import { v4 as uuid } from "uuid";
import db from "../../database/index";

import {
  validateDelete,
  validateGet,
  validatePost,
  validatePut,
} from "./middlewares";

export function createPartsRouter(): Router {
  return Router()
    .get("/part/:document", [validateGet], (request, response) => {
      response.json(
        db.get("parts").find({ document: request.params.document }).value()
      );
    })
    .post("/part", [validatePost], (request, response) => {
      db.get("parts")
        .push({ id: uuid(), ...request.body })
        .write();
      response.status(200).json({ message: "Part registered" });
    })
    .put("/part/:id", [validatePut], (request, response) => {
      db.get("parts")
        .find({ id: request.params.id })
        .assign(request.body)
        .write();
      response.sendStatus(204);
    })
    .delete("/part/:id", [validateDelete], (request, response) => {
      db.get("parts").remove({ id: request.params.id }).write();
      response.sendStatus(204);
    });
}
