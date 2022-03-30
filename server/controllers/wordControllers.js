import Word from "../models/wordModel.js"
import { randomMin } from "../utility/dbFunctions.js";

export const getAllWords = async (req, res) => {
    try {
        const allwords = await Word.find();
        res.status(200).json(allwords)
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const getWords = async (req, res) => {
    try {
        const count = await Word.count()
      
        const min = randomMin(count)
        
        const wordlist = await Word.find();
        res.status(200).json(wordlist.slice(min, min + 5))
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}