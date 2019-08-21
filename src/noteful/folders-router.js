const express = require('express')
const NotefulService = require('./noteful-service')
const foldersRouter = express.Router()
const jsonParser = express.json()
const xss = require('xss')

const serializeFolder = folder => ({
    id: folder.id,
    name: xss(folder.name)
});

foldersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        NotefulService.getAllFolders(knexInstance)
            .then(folders => {
                return res.json(folders.map(serializeFolder))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { name } = req.body
        const newFolder = { name }

        NotefulService.insertFolder(
            req.app.get('db'),
            newFolder
        )
            .then(folder => {
                res.status(201).location(`/${folder.id}`).json(serializeFolder(folder))
            })
            .catch(next)
    });

foldersRouter
    .route('/:folder_id')
    .all((req, res, next) => {
        const { folder_id } = req.params
        NotefulService.getFolderById(
            req.app.get('db'),
            folder_id
        )
            .then(folder => {
                res.folder = folder
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeFolder(res.folder))
    })
    .delete((req, res, next) => {
        console.log('Here!')
        console.log(res.folder.id)
        const { id } = res.folder
        NotefulService.deleteFolder(
            req.app.get('db'),
            id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = {
    foldersRouter
}