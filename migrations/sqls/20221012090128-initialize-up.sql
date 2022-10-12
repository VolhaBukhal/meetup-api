/* Replace with your SQL commands */

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(128) COLLATE pg_catalog."default",
    password character varying(128) COLLATE pg_catalog."default",
    role character varying(128) COLLATE pg_catalog."default",
    refresh_token character varying(255) COLLATE pg_catalog."default",
    google_id character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table: public.meetup

-- DROP TABLE IF EXISTS public.meetup;

CREATE TABLE IF NOT EXISTS public.meetup
(
    id_meetup character varying(255) COLLATE pg_catalog."default" NOT NULL,
    title character varying(255) COLLATE pg_catalog."default",
    description character varying(255) COLLATE pg_catalog."default",
    "time" timestamp without time zone,
    place character varying(64) COLLATE pg_catalog."default",
    tags character varying(128)[] COLLATE pg_catalog."default",
    fk_user_id character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT meetup_pkey PRIMARY KEY (id_meetup),
    CONSTRAINT meetup_fk_user_id_fkey FOREIGN KEY (fk_user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.meetup
    OWNER to postgres;


-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(128) COLLATE pg_catalog."default",
    password character varying(128) COLLATE pg_catalog."default",
    role character varying(128) COLLATE pg_catalog."default",
    refresh_token character varying(255) COLLATE pg_catalog."default",
    google_id character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
