const {v4 } = require ('uuid')
const { pool } = require('@config/db')
const { status, errorMessage } = require('@constants/status')

const getMeetups = async (req, res) => {
  let getAllMeetupsQuery = 'SELECT * FROM meetup'
  const { sort_by, search, title, place, description, limit } = req.query

  if (sort_by) {
    if (sort_by.charAt(0) === '-') {
      getAllMeetupsQuery += ` ORDER BY ${sort_by.substring(1)} DESC`
    } else {
      getAllMeetupsQuery += ` ORDER BY ${sort_by} ASC`
    }
  }

  if (search) {
    getAllMeetupsQuery += ` WHERE to_tsvector(title || description || place) @@ to_tsquery('${search}')`
  }

  if (title || place || description) {
    let titleCondition
    let placeCondition
    let descriptionCondition
    if (title) {
      titleCondition = ` (title ILIKE '%${title}%')`
    }

    if (place) {
      placeCondition = ` (place ILIKE '%${place}%')`
    }

    if (description) {
      descriptionCondition = ` (description ILIKE '%${description}%')`
    }

    const filterArr = [
      titleCondition ?? '',
      placeCondition ?? '',
      descriptionCondition ?? '',
    ]
      .filter((item) => item)
      .join(' AND')

    getAllMeetupsQuery += ` WHERE ${filterArr}`
  }

  if (limit) {
    getAllMeetupsQuery += ` LIMIT ${limit}`
  }

  try {
    const meetups = await pool.query(getAllMeetupsQuery)
    if (!meetups.rowCount) {
      return res.status(status.success).send('No meetups in database')
    }
    return res.json(meetups.rows)
  } catch (error) {
    res.status(status.error).send(errorMessage)
  }
}

const createMeetup = async (req, res) => {
  const id = v4()
  const { title, description, time, place } = req.body
  const { id: user_id } = req.user
  const createMeetupsQuery =
    'INSERT INTO meetup (id_meetup, title, description, time, place, fk_user_id) values($1, $2, $3, $4, $5, $6) RETURNING *'
  const queryValues = [id, title, description, time, place, user_id]

  try {
    const newMeetup = await pool.query(createMeetupsQuery, queryValues)
    res.status(status.created).json(newMeetup.rows[0])
  } catch (err) {
    res.status(status.error).json({ message: 'Something wrong with request' })
  }
}

const getMeetupById = async (req, res) => {
  const { id } = req.params
  const getSingleMeetupQuery = 'SELECT * FROM meetup WHERE id_meetup = $1'

  try {
    const singleMeetup = await pool.query(getSingleMeetupQuery, [id])
    if (!singleMeetup.rowCount) {
      res.status(status.not_found).send(`No meetup in database with id: ${id}`)
    }
    res.status(status.success).json(singleMeetup.rows[0])
  } catch (err) {
    res.status(status.error).send(errorMessage)
  }
}

const deleteMeetup = async (req, res) => {
  const { id } = req.params
  const deleteMeetupQuery = 'DELETE FROM meetup WHERE id_meetup = $1'
  try {
    const responseDB = await pool.query(deleteMeetupQuery, [id])
    if (!responseDB.rowCount) {
      res
        .status(status.not_found)
        .send(`Meetup with the id: ${id} doesn't exist in database`)
    } else {
      res
        .status(status.success)
        .send(`Meetup with the id: ${id} deleted from database`)
    }
  } catch (error) {
    res.status(status.error).send(errorMessage)
  }
}

const updateMeetup = async (req, res) => {
  const { id } = req.params
  const { title, description, time, place } = req.body
  const { id: user_id } = req.user

  const updateMeetupQuery =
    'UPDATE meetup SET title = COALESCE($1, title), description = COALESCE($2, description), time = COALESCE($3, time), place = COALESCE($4, place), fk_user_id = COALESCE($5, fk_user_id)  WHERE id_meetup = $6 RETURNING *'
  const updateMeetupQueryValues = [title, description, time, place, id, user_id]

  try {
    const updatedMeetup = await pool.query(
      updateMeetupQuery,
      updateMeetupQueryValues
    )
    res.status(status.no_content).json({ message: 'Meetup is updated' })
  } catch (error) {
    console.log(error)
    res.status(status.error).send(errorMessage)
  }
}


module.exports = {
  getMeetups,
  createMeetup,
  getMeetupById,
  deleteMeetup,
  updateMeetup
}
