"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDelete = exports.validatePut = exports.validatePost = exports.validateGet = void 0;
const Joi = require("@hapi/joi");
const uuidSchema = Joi.string().uuid();
const phoneSchema = Joi.object({
    ddd: Joi.number().required(),
    number: Joi.number().required(),
});
const partSchema = Joi.object({
    name: Joi.string().required(),
    document: Joi.number().required(),
    email: Joi.string().email().required(),
    secondName: Joi.string().required(),
    phone: phoneSchema.required(),
});
function validateGet(request, response, next) {
    try {
        const document = request.params.document;
        Joi.assert(document, Joi.string().required());
        next();
    }
    catch (error) {
        response
            .status(400)
            .json({ message: "Invalid Schema", details: error.details });
    }
}
exports.validateGet = validateGet;
function validatePost(request, response, next) {
    try {
        const payload = request.body;
        Joi.assert(payload, partSchema);
        next();
    }
    catch (error) {
        response
            .status(400)
            .json({ message: "Invalid Schema", details: error.details });
    }
}
exports.validatePost = validatePost;
function validatePut(request, response, next) {
    try {
        const uuid = request.params.id;
        const payload = request.body;
        Joi.assert(payload, partSchema);
        Joi.assert(uuid, uuidSchema);
        next();
    }
    catch (error) {
        response
            .status(400)
            .json({ message: "Invalid Schema", details: error.details });
    }
}
exports.validatePut = validatePut;
function validateDelete(request, response, next) {
    try {
        const uuid = request.params.id;
        Joi.assert(uuid, uuidSchema);
        next();
    }
    catch (error) {
        response
            .status(400)
            .json({ message: "Invalid Schema", details: error.details });
    }
}
exports.validateDelete = validateDelete;
