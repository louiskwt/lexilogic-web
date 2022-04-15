import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'
import Loader from '../components/Loader/Loader';

const API_URL = 'api/word/'

const WordStateContext = React.createContext()
const GameStateContext = React.createContext()
const PopUpStateContext = React.createContext()
const LoaderStateContext = React.createContext()

 
// set up word context
export function useWordState() {
    return useContext(WordStateContext)
}

// Set up game state context
export function useGameState() {
    return useContext(GameStateContext)
}

// Set up Modal context
export function usePopUpState() {
    return useContext(PopUpStateContext)
}

// Set up Loader Context
export function useLoaderState() {
    return useContext(LoaderStateContext)
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

    // overlay state
    const [page, setPage] = useState('100%') 

    // page content
    const [pageContent, setPageContent] = useState('')

    // Loader state
    const [loading, setLoading] = useState(false)

    // Loader context
    const loaderValue = {loading, setLoading}

    // modal context values
    const popUp = {modalState, setModalState, page, setPage, pageContent, setPageContent}

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


    }, [setWordState, setLoading])


    // Returning all the providers
    return (
        <WordStateContext.Provider value={word}>
            <GameStateContext.Provider value={gameLogic} >
                <PopUpStateContext.Provider value={popUp}>
                    <LoaderStateContext.Provider value={loaderValue} >
                        {
                        !wordState ? (
                            <>
                                <div style={{ height: "600px", position: "relative"  }}>
                                    <div style={{ margin: 0, position: 'absolute', top: '50%', left: '43%' }}>
                                            <Loader />
                                    </div>
                                </div>
                            </>
                           
                        ) : 
                            children  
                        }
                    </LoaderStateContext.Provider>
                </PopUpStateContext.Provider>
            </GameStateContext.Provider>
        </WordStateContext.Provider>
    )
}