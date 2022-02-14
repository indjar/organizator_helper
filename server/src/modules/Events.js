import { getConnection } from "../database/mysql.js";

export default class Events {
    constructor({ id, event }) {
        this.id = id;
        this.event = event;
    }

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
      CREATE TABLE IF NOT EXISTS events (
          id INTEGER AUTO_INCREMENT NOT NULL,
          event VARCHAR(1240) NOT NULL,
          PRIMARY KEY (id),
          UNIQUE (id)
          )
      `;

            await connection.query(query);

            console.log("Successfully created 'events' table");
        } catch (e) {
            console.log("Couldn't init 'events' to db", e);
            throw e;
        }
    };

    static async create({id, event }) {
        try {
            const connection = await getConnection();
            const query = `
            INSERT INTO events
            VALUES (?, ?);
        `;
        const [{ insertId }] = await connection.query(query, [id, event]);

            return new Events({event});
        } catch (e) {
            console.log("Couldn't create event", e);
            throw e;
        }
    };

    static async getAll() {
        try {
            const connection = await getConnection();
            const query = `SELECT * FROM events`;
            const [data] = await connection.query(query);
            const event= data;

            if (!event) return null;

            return event.map((id) => new Events(id));
        } catch (e) {
            console.log(`Couldn't get events`, e);
            throw e;
        }
    };

    static async update({ id, event }) {
        try {
            const connection = await getConnection();
            console.log(id ,event);
            const query = `
        UPDATE events
        SET event=?
        where id=?
        ;
      `;
            await connection.query(query, [event, id]);
            if (id!==query.id){
                return console.error('NULL');
            }
            return new Events({ event, id });
        } catch (error) {
            console.log(
                "There is no event, please add some or contact CSS",
                error
            );
            throw error;
        }
    };

    static async delete({ id }) {
        try {
            const connection = await getConnection();

            const query = `
        DELETE FROM events
        where id=?;
      `;

            await connection.query(query, [id]);
            if (id!==query.id){
                return console.error('NULL');
            }
            return new Events({ id });
        } catch (error) {
            console.log(
                "There is no event, please add some or contact CSS",
                error
            );
            throw error;
        }
    };
}
