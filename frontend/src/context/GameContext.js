import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'

const API_URL = 'api/word/'

const WordStateContext = React.createContext()
const GameStateContext = React.createContext()
const ModalStateContext = React.createContext()
 
// set up word context
export function useWordState() {
    return useContext(WordStateContext)
}

// Set up game state context
export function useGameState() {
    return useContext(GameStateContext)
}

// Set up Modal context
export function useModalState() {
    return useContext(ModalStateContext)
}



export function GameProvider({ children }) {
    // word state
    const [wordState, setWordState] = useState(null)

    // attemt state
    const [attempts, setAttempts] = useState(null)

    // Game state
    const [gameState, setGameState] = useState({
        correctGuess: [],
        wrongGuess: [],
        end: false,
        win: null,
        nextLetter: 0,  // position for tile
        guessRemaining: 6 // position for row
    })

    // color state
    const [colorState, setColorState] = useState(null)

    // key color state
    const [keyState, setKeyState] = useState({
        correct: [],
        present: [],
        absent: []
    })


    // modal state
    const [modalState, setModalState] = useState('none')

    // modal context values
    const modal = {modalState, setModalState}

    // word context values
    const word = { wordState, setWordState }

    // game state context values
    const gameLogic = { gameState, setGameState, attempts, setAttempts, colorState, setColorState, keyState, setKeyState }

    // Fetch the word in context on first render
    useEffect(() => {
        const fetchWord = async () => {
            const response = await axios.get(API_URL)
                setWordState(response.data)
                
        }
        fetchWord().catch(console.error)


    }, [setWordState])

    // Returning all the providers
    return (
        <WordStateContext.Provider value={word}>
            <GameStateContext.Provider value={gameLogic} >
                <ModalStateContext.Provider value={modal}>
                    {!wordState ? (
                        <></>
                    ) : (
                        children
                    )}
                </ModalStateContext.Provider>
            </GameStateContext.Provider>
        </WordStateContext.Provider>
    )
}