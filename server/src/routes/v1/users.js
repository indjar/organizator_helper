import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../modules/Users.js";
import { config } from "dotenv";
import { body } from "express-validator";
import { validateErrorsMiddleware } from "../../middleware/validateErrors.js";

config();

const router = Router();

router.post("/register",
    body(["email"]).isEmail(),
    body(["password"]).isLength(8),
    validateErrorsMiddleware,
    async (req, res) => {
        const { email, password } = req.body;
        const hashed = await hash(password, 10);

        try {
            const user = await Users.create({ email, password: hashed });

            res.status(200).send({
                user
            });
        } catch (error) {
            if (error.msg === "Invalid value") {
                res.status(402).send(`Invalid ${param}`)
            }
            res.status(500).send({
                error: error.message,
            });
        }
    });

router.post("/login",
    body(["email"]).isEmail(),
    body(["password"]).isLength(8),
    validateErrorsMiddleware,
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await Users.login(email);

            const error = "Couldn't login";

            if (!user) {
                return res.status(403).send({
                    error,
                });
            }

            const isValidPw = await compare(password, user.password);

            if (!isValidPw) {
                return res.status(403).send({
                    error,
                });
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email
                },
                process.env.TOKEN_SECRET
            );

            res.send({
                token,
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

export default router;
