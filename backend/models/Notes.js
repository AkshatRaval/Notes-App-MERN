import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Note = mongoose.model('Note', notesSchema)

export default Note;