import express from 'express'
import { getAllNotes, makeNewNote, updateNoteById, deleteNoteById, pinNoteById, getNoteById} from '../controllers/notesController.js'
const router = express.Router()

router.route('/')
    .get(getAllNotes)
    .post(makeNewNote)

router.route('/:id')
    .get(getNoteById)
    .put(updateNoteById)
    .delete(deleteNoteById)

router.route('/pin/:id').put(pinNoteById)

export default router