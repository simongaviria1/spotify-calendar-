DROP DATABASE IF EXISTS calendar_events;
CREATE DATABASE calendar_events;

\c calendar_events;

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
    event_month VARCHAR,
    event_day VARCHAR,
    event_year VARCHAR,
    user_id INTEGER REFERENCES users(ID)
);


INSERT INTO users (fullName,username, password_digest, email)
  VALUES('Simon Gaviria', 'simongaviria1','$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'simongaviria1@gmail.com');


INSERT INTO events (description, start_time, end_time, event_month, event_day, event_year, user_id)
  VALUES('my first event', '11:00', '12:00', '06', '22', '2018', 1);