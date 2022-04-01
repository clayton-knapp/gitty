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

  static async insert({ text, email, username }) {

    const { rows } = await pool.query(
      `
      INSERT INTO 
        posts (text, email, username)
      VALUES 
        ($1, $2, $3)
      RETURNING 
        *
    `,
      [text, email, username]
    );

    return new Post(rows[0]);
  }
};
