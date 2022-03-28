import express from 'express'
import { getWords } from '../controllers/wordControllers.js'

const router = express.Router()


router.get('/', getWords)


export default router