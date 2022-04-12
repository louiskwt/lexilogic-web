import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'

const API_URL = 'api/word/'

const WordStateContext = React.createContext()
const GameStateContext = React.createContext()
const ModalStateContext = React.createContext()
 
export function useWordState() {
    return useContext(WordStateContext)
}

export function useGameState() {
    return useContext(GameStateContext)
}

export function useModalState() {
    return useContext(ModalStateContext)
}



export function GameProvider({ children }) {
    const [wordState, setWordState] = useState(null)

    const [attempts, setAttempts] = useState(null)

    const [gameState, setGameState] = useState({
        correctGuess: [],
        wrongGuess: [],
        end: false,
        win: null,
        nextLetter: 0,  // position for tile
        guessRemaining: 6 // position for row
    })

    const [colorState, setColorState] = useState(null)

    const [keyState, setKeyState] = useState({
        correct: [],
        present: [],
        absent: []
    })

    const [modalState, setModalState] = useState('none')

    const modal = {modalState, setModalState}

    const word = { wordState, setWordState }

    const gameLogic = { gameState, setGameState, attempts, setAttempts, colorState, setColorState, keyState, setKeyState }

    useEffect(() => {
        const fetchWord = async () => {
            const response = await axios.get(API_URL)
                setWordState(response.data)
                
        }
        fetchWord().catch(console.error)


    }, [setWordState])

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