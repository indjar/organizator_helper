import { getConnection } from "../database/mysql.js";

export default class EventParticipants {
    constructor({ id, participant_id, event_id, event_date }) {
        this.id = id;
        this.participant_id = participant_id;
        this.event_id = event_id;
        this.event_date = event_date;
    }

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
      CREATE TABLE IF NOT EXISTS event_participants (
          id INTEGER AUTO_INCREMENT NOT NULL,
          participant_id INT NOT NULL,
          event_id INT NOT NULL,
          event_date DATE NOT NULL,
          PRIMARY KEY (id),
          UNIQUE (id),
          FOREIGN KEY (participant_id) REFERENCES participants (id) ON DELETE CASCADE,
          FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
          )
      `;

            await connection.query(query);

            console.log("Successfully created 'event_participants' table");
        } catch (e) {
            console.log("Couldn't init 'event_participants' to db", e);
            throw e;
        }
    };

    static async create({ participant_id, event_id, event_date }) {
        try {
            const connection = await getConnection();
            const query = `
            INSERT INTO event_participants (participant_id, event_id, event_date)
            VALUES (?, ?, ?);
        `;
            const [{ insertId }] = await connection.query(query, [participant_id, event_id, event_date]);
            let date = new Date();
            let curent_date = date.toISOString().slice(0, 10);
            console.log(curent_date)
            if (event_date <= curent_date) return ({ error: `Incorect date ${event_date}` });

            return new EventParticipants({ id: insertId, participant_id, event_id, event_date });
        } catch (e) {
            console.log("Couldn't create participants", e);
            throw e;
        }
    };

    static async getAll() {
        try {
            const connection = await getConnection();
            const query = `SELECT e.event, ep.event_date, p.name, p.surname, p.email   
                FROM event_participants ep
                LEFT JOIN participants p on p.id=ep.participant_id
                LEFT JOIN events e on e.id=ep.event_id`;
            const [data] = await connection.query(query);
            const eventParticipants = data;

            if (!eventParticipants) return null;

            return new EventParticipants(eventParticipants);
        } catch (e) {
            console.log(`Couldn't get participants`, e);
            throw e;
        }
    };

    static async getByEvent(eventId) {
        try {
            const connection = await getConnection();
            const query = `SELECT e.event, ep.event_date, p.name, p.surname, p.email   
                FROM event_participants ep
                LEFT JOIN participants p on p.id=ep.participant_id
                LEFT JOIN events e on e.id=ep.event_id
                WHERE e.id=?`;
            const [data] = await connection.query(query, [eventId]);
            const eventParticipants = data;

            if (!eventParticipants) return null;

            return new EventParticipants(eventParticipants);
        } catch (e) {
            console.log(`Couldn't get participants`, e);
            throw e;
        }
    };

    static async update({ participant_id, event_id, event_date, id }) {
        try {
            const connection = await getConnection();
            const query = `
            UPDATE event_participants
            SET participant_id=?, event_id=?, event_date=?
            where id=?
            ;
            `;

            const [{ affectedRows }] = await connection.query(query, [participant_id, event_id, event_date, id]);

            if (affectedRows > 0) {

                return new EventParticipants({ participant_id, event_id, event_date, id });
            }
        } catch (error) {
            console.log(
                "There is no events, please add some or contact CSS",
                error
            );
            throw error;
        }
    };

    static async delete({ id }) {
        try {
            const connection = await getConnection();

            const query = `
        DELETE FROM event_participants
        where id=?;
      `;

            const [{ affectedRows }] = await connection.query(query, [id]);

        } catch (error) {
            console.log(
                "There is no event, please add some or contact CSS",
                error
            );
            throw error;
        }
    };
}
