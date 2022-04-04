import Word from "../models/wordModel.js"

export const getAllWords = async (req, res) => {
    try {
        const allwords = await Word.find();
        res.status(200).json(allwords)
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const getWord = async (req, res) => {
    try {
        const count = await Word.countDocuments();
      
        let index = Math.floor(Math.random() * count)
        
        const word = await Word.findOne().skip(index);

        res.status(200).json(word)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}