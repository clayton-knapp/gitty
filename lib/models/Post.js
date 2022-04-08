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

  static insert({ text, username, email }) {

    //refactored to .then remember you need to return the whole code block from the Model method
    return pool.query(
      `
      INSERT INTO 
        posts (text, username, email)
      VALUES 
        ($1, $2, $3)
      RETURNING 
        *
    `,
      [text, username, email]
    )
      .then(({ rows }) => {
        return new Post(rows[0]);
      });

  }



  static getAllPosts() {

    return pool.query(
      `
      SELECT 
        *
      FROM 
        posts
    `
    )
      .then(({ rows }) => rows.map((row) => new Post(row)));
  }
};
