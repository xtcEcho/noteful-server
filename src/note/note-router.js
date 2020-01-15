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
    .get((req, res, next) => [
        NoteService.getNoteById(
            req.app.get('db')
                .then(note => {
                    res.json(note)
                })
                .catch(next)
        )
    ])
    

module.exports = NoteRouter