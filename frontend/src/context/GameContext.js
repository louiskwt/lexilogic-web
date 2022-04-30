import React, { useContext, useReducer } from 'react';

const GameContext = React.createContext()

// Set up game state context
export function useGame() {
    return useContext(GameContext)
}

const initialGameState = {
    correctGuess: [],
    wrongGuess: [],
    end: false,
    win: null,
    nextLetter: 0,  // position for tile
    guessRemaining: 5, // position for row
    attempts: {}
}

const initialKeyState = {
    correct: [],
    present: [],
    absent: [],
    colorState: {}
}

const ACTIONS = {
    SET_ATTEMPTS: 'set-attempts',
    SET_COLORS: 'set-colors',
}

const gameReducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.SET_ATTEMPTS:
            return {
                // Set the attemps object based on the length of the word
                ...state,
                attempts: {
                    5: [...Array(action.len).fill('')],
                    4: [...Array(action.len).fill('')],
                    3: [...Array(action.len).fill('')],
                    2: [...Array(action.len).fill('')],
                    1: [...Array(action.len).fill('')],
                }
            };
        default:
            return state
    }
}

const keyReducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.SET_COLORS:
            return {
                ...state,
                colorState: {
                    5: [...Array(action.len).fill('')],
                    4: [...Array(action.len).fill('')],
                    3: [...Array(action.len).fill('')],
                    2: [...Array(action.len).fill('')],
                    1: [...Array(action.len).fill('')],
                }
            };
        default:
            return state
    }
}


export function GameProvider({ children }) {
    // Game state
    const [gameState, dispatchGame] = useReducer(gameReducer, initialGameState)

    // Set atempts 
    const setAttempts = (len) => {dispatchGame({type: ACTIONS.SET_ATTEMPTS, len})} 


    // color state
    const [keyState, dispatchKey] = useReducer(keyReducer, initialKeyState)

    // Set colors
    const setColors = (len) => dispatchKey({type: ACTIONS.SET_COLORS, len})

    // game state context values
    const value = {setAttempts, setColors, gameState, keyState}

    // Returning the provider
    return (
        <GameContext.Provider value={value} >
            {children}
        </GameContext.Provider>
    )
}