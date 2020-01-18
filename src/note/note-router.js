const express = require('express')
const NoteService = require('./note-service')
const path = require('path')
// const xss = require('xss')
const NoteRouter = express.Router()
const jsonParser = express.json()

// const serializeNote = note => ({
//     id: note.id,
//     note_name: xss(note.note_name),
//     modified: note.modified,
//     folder_id:note.folder_id,
//     content:xss(note.content),
// })

NoteRouter
    .route('/')
    .get((req, res, next) => {
        NoteService.getAllNotes(
            req.app.get('db')
        )
            .then(notes => {
                res.json(notes)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {name, modified, folderid, content} = req.body
        const newNote = {name, modified, folderid, content}

        for (const [key, value] of Object.entries(newNote)){
            if (value == null) {
                return res.status(400).json({
                    error: {message: `Missing '${key} in request body`}
                })
            }
        }

        NoteService.insertNote(
            req.app.get('db'),
            newNote
        ).then(note => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `${note.id}`))
                .json(note)
        })
        .catch(next)
    })
    
NoteRouter
    .route('/:note_id')
    .all((req, res, next) => {
        NoteService.getNoteById(
            req.app.get('db'),
            req.params.note_id
        )
            .then(note => {
                if (!note){
                    return res.status(404).json({
                        error: {message: `Note doesn't exist`}
                    })
                }
                res.note = note
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        NoteService.getNoteById(
            req.app.get('db'),
            req.params.note_id
        ).then(note => {
            res.join(note)
        })
        .catch(next)
        }
    )
    .delete((req, res, next) => {
        NoteService.deleteNote(
            req.app.get('db'),
            req.params.note_id
        )
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
    })


    

module.exports = NoteRouter