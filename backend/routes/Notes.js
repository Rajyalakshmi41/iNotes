const express = require('express');
const Router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

Router.post('/addnotes', fetchUser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { title, description, tag } = req.body
        const note = new Notes({ title, description, tag })
        note.user = req.user
        note.save();
        res.send(note)
    }
    catch (err) {
        res.status(500).json({ error: "internal server error" })
    }

})
//fetching notes
Router.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const userId = req.user
        const notes = await Notes.find({ user: userId })
        res.send(notes)
    }
    catch (err) {
        res.status(500).json({ error: "internal server error" })
    }
})
//updating notes
Router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    try {
        const reqId = req.params.id
        const notes = await Notes.findById(reqId)
        if (!notes)
            return res.status(401).json({ error: "not found" })
        if (notes.user.toString() !== req.user)
            return res.status(400).send("permission denied")
        const { title, description, tag } = req.body
        let newNote = {}
        if (title)
            newNote.title = title
        if (description)
            newNote.description = description
        if (tag)
            newNote.tag = tag
        console.log(newNote)
        let note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.send(note)
    }
    catch (err) {
        res.status(500).json({ error: "internal server error" })
    }
})
//deleting the notes
Router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    try {
        const reqId = req.params.id
        const notes = await Notes.findById(reqId)
        if (!notes)
            return res.status(401).json({ error: "not found" })
        if (notes.user.toString() !== req.user)
            return res.status(400).send("permission denied")
        let note = await Notes.findByIdAndDelete(req.params.id)
        res.send(note)
        console.log(note)
    }
    catch (err) {
        res.status(500).json({ error: "internal server error" })
    }
})
module.exports = Router