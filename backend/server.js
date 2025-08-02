import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import notesRoutes from './routes/notesRoutes.js'
import cors from "cors";


dotenv.config()
const port = process.env.PORT;
const app = express()
app.use(express.json());

connectDB()
app.use(cors()); // Allow all origins — for development

app.use('/notes', notesRoutes)

app.listen(port, () => {
    console.log(`Server Started at ${port}`);

})