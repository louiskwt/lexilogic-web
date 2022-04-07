import express from "express";
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB }  from './config/db.js'
import wordRoutes from './routes/wordRoutes.js'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(cors())

// Word routes
app.use('/api/word', wordRoutes)

connectDB()

app.listen(port, () => console.log(`Sever started on port: ${[port]}`))
