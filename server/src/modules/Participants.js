import { getConnection } from "../database/mysql.js";

export default class Participants {
    constructor({ id, name, surname, email, birth, added_by, age }) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.birth = birth;
        this.aded_by = added_by;
        this.age = age;
    }

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
      CREATE TABLE IF NOT EXISTS participants (
          id INTEGER AUTO_INCREMENT NOT NULL,
          name VARCHAR (120) NOT NULL,
          surname VARCHAR (120) NOT NULL,
          email VARCHAR(120) NOT NULL,
          birth YEAR NOT NULL,
          added_by INTEGER NOT NULL,
          PRIMARY KEY (id),
          UNIQUE (email),
          FOREIGN KEY (added_by) REFERENCES users (id) ON DELETE CASCADE
          )
      `;

            await connection.query(query);

            console.log("Successfully created 'participants' table");
        } catch (error) {
            console.log("Couldn't init 'participants' to db", error);
            throw error;
        }
    };

    static async create({ name, surname, email, birth, added_by }) {
        try {
            const connection = await getConnection();
            const query = `
            INSERT INTO participants (name, surname, email, birth, added_by)
            VALUES (?, ?,?,?,?);
        `;
            const [{ insertId }] = await connection.query(query, [name, surname, email, birth, added_by]);

            return new Participants({ id: insertId, name, surname, email, birth, added_by });
        } catch (error) {
            console.log("Couldn't create participants", error);
            throw error;
        }
    };

    static async getAll() {
        try {
            const connection = await getConnection();
            const query = `SELECT p.*, 
                (YEAR(current_date) - birth) AS age 
                FROM participants p`;
            const [data] = await connection.query(query);
            const participants = data;
            console.log(JSON.stringify(data))
            if (!participants) return null;

            return JSON.stringify(participants.map((email) => new Participants(email)));
        } catch (error) {
            console.log(`Couldn't get participants`, error);
            throw error;
        }
    };

    static async update({ name, surname, email, birth, id }) {
        try {
            const connection = await getConnection();
            console.log(name, surname, email, birth, id);
            const query = `
        UPDATE participants
        SET name=?, surname=?, email=?, birth=?
        where id=?
        ;
      `;

            await connection.query(query, [name, surname, email, birth, id]);

            if (id!==query.id){
                return console.error('NULL');
            }
            return new Participants({ name, surname, email, birth, id });
        } catch (error) {
            console.log(
                "There is no participants, please add some or contact CSS",
                error
            );
            throw error;
        }
    };

    static async delete({ id }) {
        try {
            const connection = await getConnection();

            const query = `
        DELETE FROM participants
        where id=?;
      `;

            await connection.query(query, [id]);
            if (id!==query.id){
                return console.error('NULL');
            }
            return new Participants({ id });
        } catch (error) {
            console.log(
                "There is no participants, please add some or contact CSS",
                error
            );
            throw error;
        }
    };
}
