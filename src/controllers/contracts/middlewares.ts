import { NextFunction, Request, Response } from "express";
import { AssociatePart, Contract, Part, Phone } from "../types";
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

const contractSchema = Joi.object<Contract>({
  title: Joi.string().required(),
  expiration: Joi.string().required(),
  parts: Joi.array().items(partSchema).optional().allow("", null),
  startDate: Joi.string().required(),
  file: Joi.string().required(),
});

const associateSchema = Joi.object<AssociatePart>({
  contractTitle: Joi.string().required(),
  partDocument: Joi.number().required(),
});

export function validateGet(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const title = request.params.document;
    Joi.assert(title, Joi.string().required());
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
    const payload = request.body as Contract;
    Joi.assert(payload, contractSchema);
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
    const payload = request.body as AssociatePart;
    Joi.assert(payload, associateSchema);
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
