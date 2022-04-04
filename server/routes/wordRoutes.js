import express from 'express'
import { getWord, getAllWords } from '../controllers/wordControllers.js'

const router = express.Router()


router.get('/', getWord)

router.get('/all', getAllWords)


export default router