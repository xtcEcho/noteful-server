const express = require('express')
const FolderService = require('./folder-service')
const path = require('path')
// const xss = require('xss')
const FolderRouter = express.Router()
const jsonParser = express.json()

// const serializeFolder = folder => ({
//     id : folder.id,
//     folder_name: xss(folder.folder_name),
// })

FolderRouter
    .route('/')
    .get((req, res, next) => {
        FolderService.getAllFolders(
            req.app.get('db')
        )
            .then(folders => {
                res.json(folders)
            })
            .catch(next)
    })

FolderRouter
    .route('/:folder_id')
    .all((req, res, next) => {
        FolderService.getById(
            req.app.get('db'),
            req.params.folder_id
        )
            .then(folder => {
                if(!folder){
                    return res.status(404).json({
                        error:{message: `Folder doesn't exist`}
                    })
                }
                res.folder = folder
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        FolderService.getById(knexInstance, req.params.folder_id)
            .then(folder => {
                res.json(folder)
            })
            .catch(next)
    })
module.exports = FolderRouter