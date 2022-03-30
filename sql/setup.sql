-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS github_users;

CREATE TABLE github_users (
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar TEXT
);

CREATE TABLE tweets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  text TEXT NOT NULL,
  username TEXT REFERENCES github_users(username),
  email TEXT REFERENCES github_users(email)
);


INSERT INTO tweets 
  (text, username, email)
VALUES
  ('tweeting is fun', 'Bob-Bob', 'bob@bob.com'),
  ('tweeting is whatever', 'Sterling', 'sterling@cat.com');
