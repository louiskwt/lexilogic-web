import Word from "../models/wordModel.js"

export const getWords = async (req, res) => {
    try {
        const wordlist = await Word.find();
        res.status(200).json(wordlist)
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const getWord = async (req, res) => {
    try {
        const singleWord = await Word.findOne();
        res.status(200).json(singleWord)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}