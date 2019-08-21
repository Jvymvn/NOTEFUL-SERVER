// const path = require('path')
const express = require('express')
const NotefulService = require('./noteful-service')

const notesRouter = express.Router()
const jsonParser = express.json()

notesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        NotefulService.getAllNotes(knexInstance)
            .then(note => {
                res.json(note)
            })
            .catch(next)
    })

module.exports = {
    notesRouter
}