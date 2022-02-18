import { Router } from "express";
import EventParticipants from "../../modules/EventParcipiants.js";
import isLoggedIn from "../../middleware/isLoggedIn.js";

const router = Router();

router.get("/",
    isLoggedIn,
    async (req, res) => {
        try {

            const event = await EventParticipants.getAll();

            res.status(200).send(event);
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

router.get("/structured",
    isLoggedIn,
    async (req, res) => {
        try {

            const event = await EventParticipants.getStructuredEventList();

            res.status(200).send(event);
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

router.get("/:id",
    isLoggedIn,
    async (req, res) => {
        try {
            const id = Number(req.params.id);

            const event = await EventParticipants.getByEvent(id);

            res.status(200).send(event);
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

router.post(
    "/",
    isLoggedIn,
    async (req, res) => {
        try {
            const { participant_id, event_id, event_date } = req.body;

            const data = await EventParticipants.create({
                participant_id,
                event_id,
                event_date,
            });

            if (!data) {
                return res.status(400).send({ error: "Incorect data" });
            }
            res.status(200).send({
                data,
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }
);


router.delete("/:id",
    isLoggedIn,
    async (req, res) => {
        try {
            const id = Number(req.params.id);

            const data = await EventParticipants.delete({ id });

            res.status(200).send({
                message: `${id} deleted`
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

export default router;
