import {v4 as uuid} from 'uuid'

import { pool } from '../db.js'

let meetups = [
    {
        title: "express discussion",
        description: "need to get acquaintance",
        tegs: ["node", "express", "backend"],
        time: "2022-08-25",
        place: "Victoria hotel",
        id: "1"
    },
    {
        title: "node.js discussion",
        description: "need to get acquaintance",
        tegs: ["node", "backend"],
        time: "2022-08-26",
        place: "Victoria hotel",
        id: "2"
    }
]

export const getMeetups =  async(req, res) => {
    const getAllMeetupsQuery = 'SELECT * FROM meetup'
    const meetups = await pool.query(getAllMeetupsQuery)
    res.json(meetups.rows)
}

export const createMeetup = async (req, res) => {
    const id = uuid();
    const {title, description, time, place} = req.body
    const createMeetupsQuery = 'INSERT INTO meetup (id_meetup, title, description, time, place) values($1, $2, $3, $4, $5) RETURNING *'
    const queryValues = [id, title, description, time, place]
    const newMeetup = await pool.query(createMeetupsQuery, queryValues)
    res.json(newMeetup.rows[0])
}

export const getMeetupById =  async (req, res) => {
    const { id } = req.params;
    const getSingleMeetupQuery = 'SELECT * FROM meetup WHERE id_meetup = $1'
    const singleMeetup = await pool.query(getSingleMeetupQuery, [id])
    res.json(singleMeetup.rows[0])
}

export const deleteMeetup = async (req, res) => {
    const { id } = req.params
    const deleteMeetupQuery = 'DELETE FROM meetup WHERE id_meetup = $1'
    await pool.query(deleteMeetupQuery, [id], (err) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.send(`Meetup with the id: ${id} deleted from database`)
    })
}

export const updateMeetup = async (req, res) => {
    const { id } = req.params
    const {title, description, time, place} = req.body

    const updateMeetupQuery = 'UPDATE meetup SET title = COALESCE($1, title), description = COALESCE($2, description), time = COALESCE($3, time), place = COALESCE($4, place) WHERE id_meetup = $5 RETURNING *'
    const updateMeetupQueryValues = [title, description, time, place, id ]
    
    const updatedMeetup = await pool.query(updateMeetupQuery, updateMeetupQueryValues)
    
    res.json(updatedMeetup.rows[0])
}
