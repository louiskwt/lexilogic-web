import express from 'express'
import { getWords, getAllWords } from '../controllers/wordControllers.js'

const router = express.Router()


router.get('/', getWords)

router.get('/all', getAllWords)


export default router