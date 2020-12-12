DROP TABLE IF EXISTS announcements;

CREATE TABLE announcements (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  side TEXT NOT NULL,
  title TEXT,
  body TEXT
);
