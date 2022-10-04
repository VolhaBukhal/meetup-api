CREATE DATABASE meetups

CREATE TABLE users (
 user_id varchar(255) PRIMARY KEY,
 email varchar(128),
 password varchar(128),
 role varchar(128),
 refresh_token varchar(255)
);

CREATE TABLE meetup 
(
    id_meetup varchar(255) PRIMARY KEY,
    title varchar(255),
    description varchar(255),
    time timestamp,
    place varchar(64),
    tags varchar(128)[],
    fk_user_id varchar(255),
	FOREIGN KEY(fk_user_id) REFERENCES users(user_id)
);
