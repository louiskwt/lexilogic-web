import axios from 'axios'

const API_URL = '/api/word'

const fetchWord = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

const gameService = { fetchWord }

export default gameService