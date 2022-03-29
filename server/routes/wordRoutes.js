import express from 'express'
import { getWords, getWord } from '../controllers/wordControllers.js'

const router = express.Router()


router.get('/', getWord)

router.get('/all', getWords)


export default router