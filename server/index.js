import express from "express";
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB }  from './config/db.js'
import wordRoutes from './routes/wordRoutes.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(cors())

// Word routes
app.use('/api/word', wordRoutes)


// solving the dirname is not defined problem
const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

// Serve frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('The site is under maintaince~ Will be back soon!'))
}

connectDB()

app.listen(port, () => console.log(`Sever started on port: ${[port]}`))
