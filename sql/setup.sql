-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS tweets CASCADE;

CREATE TABLE github_users (
  username TEXT NOT NULL PRIMARY KEY,
  email TEXT UNIQUE,
  avatar TEXT
);

CREATE TABLE tweets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  text TEXT NOT NULL,
  email TEXT REFERENCES github_users(email),
  username TEXT REFERENCES github_users(username)
);


INSERT INTO tweets 
  (text)
VALUES
  ('tweeting is fun'),
  ('tweeting is whatever');
