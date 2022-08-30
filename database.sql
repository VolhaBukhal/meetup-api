CREATE TABLE person 
(
    person_id varchar(255) PRIMARY KEY,
    name varchar(64) NOT NULL,
    surname varchar(255) NOT NULL
);

CREATE TABLE meetup 
(
    id_meetup varchar(255) PRIMARY KEY,
    title varchar(255),
    description varchar(255),
    time timestamp,
    place varchar(64),
    fk_user_id varchar(255),
	FOREIGN KEY(fk_user_id) REFERENCES person(person_id)
);
