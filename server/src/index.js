import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { createConnection } from "mysql2/promise";
import Users from "./modules/Users.js";
import Participants from "./modules/Participants.js";
import usersRoute from "./routes/v1/users.js";
import participantsRoute from "./routes/v1/participants.js";

config();

const app = express();

app.use(cors(), express.json())


const main = async () => {

    const {
        PORT,
        MYSQL_HOST,
        MYSQL_PORT,
        MYSQL_USER,
        MYSQL_PW,
        MYSQL_DB
    } = process.env;

    const connection = await createConnection({
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PW,
        database: MYSQL_DB
    });

    try {

        await Users.init();
        await Participants.init();

        app.sql = connection;

        app.use("/users", usersRoute);
        app.use("/participants", participantsRoute);

        app.listen(8080, () => {
            console.log("http://localhost:8080 started")
        });
    } catch (error) {
        console.error(error);

        app.get("*", (_, res) => {
            res.status(500).send("Something went wrong while starting the server");
        });

        app.listen(PORT, () => {
            console.log(`Failed load server on http://localhost:${8080}`)
        });
    }



};

main();