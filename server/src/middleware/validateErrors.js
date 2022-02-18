import { validationResult } from "express-validator";

export const validateErrorsMiddleware = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).send({ error: error.array() });
    }
    next();
}