import { Router } from "express";
import { body } from "express-validator";
import { validateErrorsMiddleware } from "../../middleware/validateErrors.js";
import EventParticipants from "../../modules/EventParcipiants.js";
import isLoggedIn from "../../middleware/isLoggedIn.js";

const router = Router();

router.get("/",
    isLoggedIn,
    async (req, res) => {
        try {
            
            const event = await EventParticipants.getAll();

            res.status(204).send(event);
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

            res.status(204).send(event);
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

router.post(
    "/",
    isLoggedIn,
    body(["event_date"]).isDate(),
    validateErrorsMiddleware,
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
            res.status(204).send({
                data,
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

            const { participant_id, event_id, event_date } = req.body;
           
            const dataEvent = await EventParticipants.update({
                participant_id, 
                event_id, 
                event_date,
                id
                }
            );

            if (!dataEvent) {
                return res.status(400).send({ error: `No event with ${id}` });
            }
            res.status(204).send({
                message: `Event ${dataEvent.id} updated`,
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
        
            const data=await EventParticipants.delete({ id });
            console.log(data)
            res.status(204).send({
                message:`${id} deleted`
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

export default router;
