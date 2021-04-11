import { NextFunction, Request, Response } from "express";
import { Contract, Part, Phone } from "../types";
import * as Joi from "@hapi/joi";

const uuidSchema = Joi.string().uuid();

const phoneSchema = Joi.object<Phone>({
  ddd: Joi.number().required(),
  number: Joi.number().required(),
});

const partSchema = Joi.object<Part>({
  name: Joi.string().required(),
  document: Joi.number().required(),
  email: Joi.string().email().required(),
  secondName: Joi.string().required(),
  phone: phoneSchema.required(),
});

export function validateGet(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const document = request.params.document;
    Joi.assert(document, Joi.string().required());
    next();
  } catch (error) {
    response
      .status(400)
      .json({ message: "Invalid Schema", details: error.details });
  }
}

export function validatePost(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const payload = request.body as Part;
    Joi.assert(payload, partSchema);
    next();
  } catch (error) {
    response
      .status(400)
      .json({ message: "Invalid Schema", details: error.details });
  }
}

export function validatePut(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const uuid = request.params.id;
    const payload = request.body as Part;
    Joi.assert(payload, partSchema);
    Joi.assert(uuid, uuidSchema);
    next();
  } catch (error) {
    response
      .status(400)
      .json({ message: "Invalid Schema", details: error.details });
  }
}

export function validateDelete(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const uuid = request.params.id;
    Joi.assert(uuid, uuidSchema);
    next();
  } catch (error) {
    response
      .status(400)
      .json({ message: "Invalid Schema", details: error.details });
  }
}
