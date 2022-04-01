const pool = require('../utils/pool');

module.exports = class Post {
  id;
  text;
  email;
  username;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
    this.username = row.username;
    this.email = row.email;
  }

  static async insert({ text, username, email }) {

    const { rows } = await pool.query(
      `
      INSERT INTO 
        posts (text, username, email)
      VALUES 
        ($1, $2, $3)
      RETURNING 
        *
    `,
      [text, username, email]
    );

    return new Post(rows[0]);
  }

  static async getAllPosts() {

    const { rows } = await pool.query(
      `
      SELECT 
        *
      FROM 
        posts
    `
    );

    return rows.map((row) => new Post(row));
  }
};
