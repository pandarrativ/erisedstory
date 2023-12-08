DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS nightmare;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE nightmare (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  rescripting TEXT,
  images TEXT,
  tags TEXT,
  title TEXT,
  FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded BOOLEAN DEFAULT FALSE
)
