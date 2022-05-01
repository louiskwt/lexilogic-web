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


const ACTIONS = {
    SET_ATTEMPTS: 'set-attempts',
    SET_NEXT: 'set-next',
    SET_MOVE: 'set-move',
    SET_WIN: 'set-win',
    SET_LOSE: 'set-lose',
}

const gameReducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.SET_ATTEMPTS:
            return {
                // Set the attemps object based on the length of the word
                ...state,
                end: false,
                attempts: {
                    5: [...Array(action.len).fill('')],
                    4: [...Array(action.len).fill('')],
                    3: [...Array(action.len).fill('')],
                    2: [...Array(action.len).fill('')],
                    1: [...Array(action.len).fill('')],
                }
            };
        case ACTIONS.SET_NEXT: // move to next row / start a new guess
            return {
                ...state,
                guessRemaining: state.guessRemaining - 1,
                nextLetter: 0
            };
        case ACTIONS.SET_MOVE:
            return {
                ...state,
                nextLetter: state.nextLetter + 1,
                attempts: {
                    ...state.attempts,
                    [state.guessRemaining]: action.targetArr
                }
            };
        case ACTIONS.SET_DELETE:
            return {
                ...state,
                nextLetter: action.prev,
                attempts: {
                    ...state.attempts,
                    [state.guessRemaining]: action.targetArr
                }
            }
        case ACTIONS.SET_WIN:
            return {
                ...state,
                correctGuess: [...state.correctGuess, action.guess],
                end: true,
                guessRemaining: 5,
                nextLetter: 0,
            };
        case ACTIONS.SET_LOSE:
            return {
                ...state,
                wrongGuess: [...state.wrongGuess, action.ans],
                end: true,
                guessRemaining: 5,
                nextLetter: 0,
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

    // Set win
    const setWin = (guess) => {dispatchGame({ type: ACTIONS.SET_WIN, guess })}

    // Set Lose
    const setLose = (ans) => { dispatchGame({ type: ACTIONS.SET_LOSE, ans }) }

    // Set Next
    const setNext = () => dispatchGame({type: ACTIONS.SET_NEXT})

    // Set move
    const setMove = (key, targetArr) => dispatchGame({ type: ACTIONS.SET_MOVE, key, targetArr })

    // Set delete
    const setDelete = (prev, targetArr) => dispatchGame({ type: ACTIONS.SET_DELETE, prev, targetArr })

    // game state context values
    const value = {
        setAttempts,
        setLose,
        setNext,
        setWin,
        setMove,
        setDelete, 
        gameState, 
    }

    // Returning the provider
    return (
        <GameContext.Provider value={value} >
            {children}
        </GameContext.Provider>
    )
}