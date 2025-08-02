import asyncHandler from "./asyncHandler.js"
import Note from '../models/Notes.js'



const getAllNotes = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? { subject: { $regex: req.query.search, $options: "i" } }
        : {};


    const notes = await Note.find().sort({ isPinned: -1, createdAt: -1 });
    res.json(notes);
})

const makeNewNote = asyncHandler(async (req, res) => {
    try {
        const { subject, text, isPinned } = req.body;

        if (!subject || !text) {
            return res.status(400).json({ message: 'Subject and text are required' });
        }

        const newNote = new Note({
            subject,
            text,
            isPinned: isPinned || false,
        });

        await newNote.save();

        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error in makeNewNote:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

const updateNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    const { subject, text } = req.body
    note.subject = subject || note.subject
    note.text = text || note.text

    const updatedNote = await note.save();

    res.json(updatedNote);
})

const deleteNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne()
    res.json({ message: "Note deleted from db" });
})

const pinNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (note) {
        note.isPinned = !note.isPinned;
        await note.save()
        res.json(note)
    } else {
        return res.status(404).json({ message: "Note not found" });
    }
})

const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
    res.json(note)
})

export { getAllNotes, makeNewNote, updateNoteById, deleteNoteById, pinNoteById, getNoteById }