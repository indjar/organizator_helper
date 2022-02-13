import { getConnection } from "../database/mysql.js";

export default class Users {
  constructor({ id, email, password }) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  static async init() {
    try {
      const connection = await getConnection();
      const query = `
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER AUTO_INCREMENT NOT NULL,
          email VARCHAR(120) NOT NULL,
          password VARCHAR (120) NOT NULL,
          PRIMARY KEY (id),
          UNIQUE (email))
      `;

      await connection.query(query);

      console.log("Successfully created 'users' table");
    } catch (error) {
      console.log("Couldn't init 'users' to db", error);
      throw error;
    }
  }

  static async create({ email, password }) {
    try {
      const connection = await getConnection();
      const query = `
            INSERT INTO users (email, password)
            VALUES (?, ?);
        `;
      const [{ insertId }] = await connection.query(query, [email, password]);

      return new Users({ id: insertId, email, password });
    } catch (error) {
      console.log("Couldn't create user", error);
      throw error;
    }
  }

  static async login(email) {
    try {
      const connection = await getConnection();
      const query = "SELECT * FROM users WHERE email = ?";
      const [data] = await connection.query(query, [email]);
      const [user] = data;

      if (!user) return null;

      return new Users({ ...user });
    } catch (error) {
      console.log(`Couldn't get user with email: ${email}`, error);
      throw error;
    }
  }
}
