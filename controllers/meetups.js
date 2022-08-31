import { v4 as uuid } from 'uuid'
import { pool } from '../db.js'
import { status, errorMessage } from '../constants/status.js'

export const getMeetups =  async(req, res) => {
    const getAllMeetupsQuery = 'SELECT * FROM meetup'

    try {
        const meetups = await pool.query(getAllMeetupsQuery)
        if (!meetups.rowCount) {
            res.status(status.success).send('No meetups in database')
        }
        res.json(meetups.rows)
    } catch (error) {
        res.status(status.error).send(errorMessage);
    }
}

export const createMeetup = async (req, res) => {
    const id = uuid();
    const {title, description, time, place} = req.body
    const createMeetupsQuery = 'INSERT INTO meetup (id_meetup, title, description, time, place) values($1, $2, $3, $4, $5) RETURNING *'
    const queryValues = [id, title, description, time, place]
    try {
        const newMeetup = await pool.query(createMeetupsQuery, queryValues)
        res.status(status.created).json(newMeetup.rows[0])
    } catch (err) {
        res.status(status.error).send(errorMessage)
    }
}

export const getMeetupById =  async (req, res) => {
    const { id } = req.params;
    const getSingleMeetupQuery = 'SELECT * FROM meetup WHERE id_meetup = $1'

    try {
        const singleMeetup = await pool.query(getSingleMeetupQuery, [id])
        if (!singleMeetup.rowCount) {
            res.status(status.not_found).send(`No meetup in database with id: ${id}`)
        }
        res.status(status.success).json(singleMeetup.rows[0])
    }catch (err) {
        res.status(status.error).send(errorMessage)
    }
}

export const deleteMeetup = async (req, res) => {
    const { id } = req.params
    const deleteMeetupQuery = 'DELETE FROM meetup WHERE id_meetup = $1'
    try {
        const responseDB = await pool.query(deleteMeetupQuery, [id])
        if (!responseDB.rowCount) {
            res.status(status.not_found).send(`Meetup with the id: ${id} doesn't exist in database`) 
        } else {
            res.status(status.success).send(`Meetup with the id: ${id} deleted from database`)
        }
    } catch (error) {
        res.status(status.error).send(errorMessage)
    }
}

export const updateMeetup = async (req, res) => {
    const { id } = req.params
    const {title, description, time, place} = req.body

    const updateMeetupQuery = 'UPDATE meetup SET title = COALESCE($1, title), description = COALESCE($2, description), time = COALESCE($3, time), place = COALESCE($4, place) WHERE id_meetup = $5 RETURNING *'
    const updateMeetupQueryValues = [title, description, time, place, id ]
    try {
        const updatedMeetup = await pool.query(updateMeetupQuery, updateMeetupQueryValues)
        res.status(status.no_content).json('Meetup is updated')
    } catch (error) {
        res.status(status.error).send(errorMessage);
    }
}
