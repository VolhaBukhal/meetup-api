import {v4 as uuid} from 'uuid'

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

export const getMeetups =  (req, res) => {res.send(meetups)}

export const createMeetup = (req, res) => {
    meetups.push({
        ...req.body,
        id: uuid()
    })
    res.send(`Meetup with title: "${req.body.title}" added to the database`)
}

export const getMeetupById =  (req, res) => {
    const { id } = req.params;
    const meetup = meetups.filter(meetup => meetup.id === id )
    res.send(meetup)
}

export const deleteMeetup = (req, res) => {
    const { id } = req.params
    meetups = meetups.filter(meetup => meetup.id !== id)
    res.send(`Meetup with the id: ${id} deleted from database`)
}

export const updateMeetup = (req, res) => {
    const { id } = req.params
    meetups = meetups.map(item => item.id === id ? {...item, ...req.body} : item )
    res.send(`Meetup with id: ${id} has been updated`)
}
