DROP DATABASE IF EXISTS calendar_events;
CREATE DATABASE calendar_events;

\c calendar_events;


DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS notes;

CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    fullName VARCHAR,
    username VARCHAR UNIQUE,
    password_digest VARCHAR,
    email VARCHAR
);

CREATE TABLE events (
    ID SERIAL PRIMARY KEY,
    description VARCHAR,
    start_time VARCHAR,
    end_time VARCHAR,
    user_id INTEGER REFERENCES users(ID)
);


INSERT INTO users (fullName,username, password_digest, email)
  VALUES('Simon Gaviria', 'simongaviria1','$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'simongaviria1@gmail.com');


INSERT INTO events (description, start_time, end_time, user_id)
  VALUES('my frist event', '11:00', '12:00', 1);