import { Router } from "express";
import { body } from "express-validator";
import { validateErrorsMiddleware } from "../../middleware/validateErrors.js";
import Participants from "../../modules/Participants.js";
import isLoggedIn from "../../middleware/isLoggedIn.js";

const router = Router();

router.get("/",
    isLoggedIn,
    async (req, res) => {
        try {

            const participants = await Participants.getAll();

            res.send(participants);
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

router.post(
    "/",
    isLoggedIn,
    body(["name", "surname", "email", "birth"]).exists(),
    body(["birth"]).isNumeric(),
    body(["email"]).isEmail(),
    validateErrorsMiddleware,
    async (req, res) => {
        try {
            const { name, surname, email, birth } = req.body;

            const added_by = req.token.userId;

            const participant = await Participants.create({
                name,
                surname,
                email,
                birth,
                added_by
            });

            if (!name || !surname || !email || !birth || !added_by) {
                return res.status(400).send({ error: "Incorect data" });
            }
            res.send({
                participant,
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }
);

router.patch("/:id",
    isLoggedIn,
    async (req, res) => {
        try {
            const id = Number(req.params.id);

            const { name, surname, email, birth } = req.body;

            const participant = await Participants.update({
                name,
                surname,
                email,
                birth,
                id,
            });

            if (!participant) {
                return res.status(400).send({ error: `No participant with ${id}` });
            }

            res.send({
                message: `Updated ${participant.id}`,
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

router.delete("/:id",
    isLoggedIn,
    async (req, res) => {
        try {
            const id = Number(req.params.id);

            const participant = await Participants.delete({ id });

            if (!participant) {
                return res.status(400).send({ error: `No participant with ${id}` });
            }
            res.send({
                message: `Deleted participant ${participant.id}`,
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

export default router;
