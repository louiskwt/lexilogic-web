import mongoose from "mongoose";

const wordModel = mongoose.Schema(
    {
        word: {
            type: String,
            required: [true, 'Please add the word']
        },
        pos: {
            type: String,
            required: [true, 'Please add pos']
        },
        meaning: {
            type: String,
            required: [true, 'Please add meaning']
        },
        tags: [String],
        createdAt: {
            type: Date(),
            default: new Date()
        }
    }
)

const Word = mongoose.model('Word', wordModel)

export default Word;