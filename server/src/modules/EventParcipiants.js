import { getConnection } from "../database/mysql.js";

export default class EventParticipants {
    constructor({ id, participant_id, event_id, event_date, event, name, surname, min_date, events_count }) {
        this.id = id;
        this.participant_id = participant_id;
        this.event_id = event_id;
        this.event_date = event_date;
        this.event = event;
        this.name = name;
        this.surname = surname;
        this.min_date = min_date;
        this.events_count = events_count;
    }

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
      CREATE TABLE IF NOT EXISTS event_participants (
          id INTEGER AUTO_INCREMENT NOT NULL,
          participant_id INT NOT NULL,
          event_id INT NOT NULL,
          event_date DATETIME NOT NULL,
          PRIMARY KEY (id),
          UNIQUE (id),
          FOREIGN KEY (participant_id) REFERENCES participants (id) ON DELETE CASCADE,
          FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
          )
      `;

            await connection.query(query);

            console.log("Successfully created 'event_participants' table");
        } catch (error) {
            console.log("Couldn't init 'event_participants' to db", error);
            throw error;
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
        } catch (error) {
            console.log("Couldn't create participants", error);
            throw error;
        }
    };

    static async getAll() {
        try {
            const connection = await getConnection();
            const query = `SELECT 
                            ep.id,
                            e.event as event, 
                            ep.event_date, 
                            p.name, 
                            p.surname, 
                            p.email   
                FROM event_participants ep
                LEFT JOIN participants p on p.id=ep.participant_id
                LEFT JOIN events e on e.id=ep.event_id
                where ep.event_date>= curdate()
                order by ep.event_date asc`;
            const [data] = await connection.query(query);
            const eventParticipants = data;
            if (!eventParticipants) return null;

            return eventParticipants.map((id) => new EventParticipants(id));
        } catch (error) {
            console.log(`Couldn't get participants`, error);
            throw error;
        }
    };

    static async getStructuredEventList() {
        try {
            const connection = await getConnection();
            const query = `SELECT 
                    ep.id,
                    e.id as event_id,
                    e.event as event,
			        COUNT(e.event) as events_count,
                    MIN(ep.event_date) as min_date
                FROM event_participants ep
                LEFT JOIN participants p on p.id=ep.participant_id
                LEFT JOIN events e on e.id=ep.event_id
                where ep.event_date >= CURDATE()
                group by e.event
                order by min_date asc;`;
            const [data] = await connection.query(query);
            const eventParticipants = data;

            if (!eventParticipants) return null;

            return eventParticipants.map((id) => new EventParticipants(id));
        } catch (error) {
            console.log(`Couldn't get participants`, error);
            throw error;
        }
    };

    static async getByEvent({ id }) {
        try {
            const connection = await getConnection();
            const query = `SELECT 
                e.id,
                e.event as event, 
                ep.event_date, 
                p.name, 
                p.surname, 
                p.email   
            FROM event_participants ep
            LEFT JOIN participants p on p.id=ep.participant_id
            LEFT JOIN events e on e.id=ep.event_id
            where ep.event_date>= curdate()
            and e.id=?
            order by ep.event_date asc;`;
            const [data] = await connection.query(query, [id]);
            const eventParticipants = data;
            if (!eventParticipants) return null;

            return eventParticipants.map((id) => new EventParticipants(id));
        } catch (error) {
            console.log(`Couldn't get participants`, error);
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
