import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'

const API_URL = 'api/word/'

const WordStateContext = React.createContext()
const GameStateContext = React.createContext()
// const GameLogicContext = React.createContext()

export function useWordState() {
    return useContext(WordStateContext)
}

export function useGameState() {
    return useContext(GameStateContext)
}



export function GameProvider({ children }) {
    const [wordState, setWordState] = useState(null)

    const [attempts, setAttempts] = useState(null)

    const [gameState, setGameState] = useState({
        guessedWords: [],
        currentGuess: [],
        end: false,
        nextLetter: 0,
        guessRemaining: 6
    })

    const gameLogic = { gameState, setGameState, attempts, setAttempts}

    useEffect(() => {
        const fetchWord = async () => {
            const response = await axios.get(API_URL)
                setWordState(response.data)
                
        }
        fetchWord().catch(console.error)


    }, [setWordState])

    return (
        <WordStateContext.Provider value={wordState}>
            <GameStateContext.Provider value={gameLogic} >
                {!wordState ? (
                    <Spinner animation="border" variant="light" />
                ) : (
                    children
                )}
            </GameStateContext.Provider>
        </WordStateContext.Provider>
    )
}