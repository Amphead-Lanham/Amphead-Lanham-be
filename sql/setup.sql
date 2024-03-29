DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS images;

CREATE TABLE announcements (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  side TEXT NOT NULL,
  title TEXT,
  body TEXT
);

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE images (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  image_url TEXT UNIQUE NOT NULL,
  caption TEXT,
  side TEXT NOT NULL
);
