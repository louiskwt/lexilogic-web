import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'

const API_URL = 'api/word/'

const WordStateContext = React.createContext()

export function useWordState() {
    return useContext(WordStateContext)
}

export function GameProvider({ children }) {
    const [wordState, setWordState] = useState(null)
    // const [gameState, setGameState] = useState({
    //     correct: [],
    //     present: [],
    //     absent: [],
    //     guessedWords: [],
    //     end: false,
    //     round: 1
    // })


    useEffect(() => {
        const fetchWord = async () => {
            const response = await axios.get(API_URL)
            
         
                setWordState(response.data)
        }
        fetchWord().catch(console.error)


    }, [setWordState])

    return (
        <WordStateContext.Provider value={wordState}>
            {!wordState ? (
                <Spinner animation="border" variant="light" />
            ) :  ( 
                 children  
            )}
        </WordStateContext.Provider>
    )
}