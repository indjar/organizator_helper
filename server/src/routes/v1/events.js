import { Router } from "express";
import { body } from "express-validator";
import { validateErrorsMiddleware } from "../../middleware/validateErrors.js";
import Events from "../../modules/Events.js";
import isLoggedIn from "../../middleware/isLoggedIn.js";

const router = Router();

router.get("/",
    isLoggedIn,
    async (req, res) => {
        try {

            const event = await Events.getAll();

            res.send(event);
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

router.post(
    "/",
    isLoggedIn,
    body(["event"]).isString(),
    validateErrorsMiddleware,
    async (req, res) => {
        try {
            const { event } = req.body;
            
            const data = await Events.create({
                event
            });

            if (!data) {
                return res.status(400).send({ error: "Incorect data" });
            }
            res.send({
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
    async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { event } = req.body;
            console.log(id, req.body.event)
           
            const data = await Events.update({
                id,
                event,
            });
        console.log(data)
            if (!data) {
                return res.status(400).send({ error: `No event with ${id}` });
            }
            res.status(204).send({
                message: `Event ${data.id} updated`,
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

router.delete("/:id",
    async (req, res) => {
        try {
            const id = Number(req.params.id);

            const data = await Events.delete({ id });

            if (!data) {
                return res.status(400).send({ error: `No event with ${id}` });
            }
            res.send({
                message: `Deleted event ${data.id}`,
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    });

export default router;
