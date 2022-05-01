import React, { useContext, useReducer } from "react";

const KeyContext = React.createContext()

export function useKey() {
    return useContext(KeyContext)
}

const initialKeyState = {
    correct: [],
    present: [],
    absent: [],
    colorState: {}
}

const ACTIONS = {
    SET_TILES: 'set-tiles',
    SET_CORRECT: 'set-correct',
    SET_PRESENT: 'set-present',
    SET_ABSENT: 'set-absent',
    RESET_KEYBOARD: 'reset-keyboard'
}

const keyReducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.SET_TILES:
            return {
                correct: [],
                present: [],
                absent: [],
                colorState: {
                    5: [...Array(action.len).fill('')],
                    4: [...Array(action.len).fill('')],
                    3: [...Array(action.len).fill('')],
                    2: [...Array(action.len).fill('')],
                    1: [...Array(action.len).fill('')],
                }
            };
        case ACTIONS.SET_CORRECT:
            return {
                ...state,
                correct: action.correctArr,
                colorState: {
                    ...state.colorState,
                    [action.atttemptNum]: action.updatedColorState
                }
            };
        case ACTIONS.SET_ABSENT:
            return {
                ...state,
                absent: action.absentArr,
                colorState: {
                    ...state.colorState,
                    [action.atttemptNum]: action.updatedColorState
                }
            };
        case ACTIONS.SET_PRESENT:
            return {
                ...state,
                present: action.presentArr,
                colorState: {
                    ...state.colorState,
                    [action.atttemptNum]: action.updatedColorState
                }
            };
        default:
            return state
    }
}

export function KeyProvider({children}) {
    // color state
    const [keyState, dispatchKey] = useReducer(keyReducer, initialKeyState)

    // Set colors
    const setTiles = (len) => dispatchKey({ type: ACTIONS.SET_TILES, len })

    // Set Correct
    const setCorrect = (attemptNum, updatedColorState, correctArr) => dispatchKey({ type: ACTIONS.SET_CORRECT, attemptNum, updatedColorState, correctArr })

    // Set Correct
    const setPresent = (attemptNum, updatedColorState, presentArr) => dispatchKey({ type: ACTIONS.SET_PRESENT, attemptNum, updatedColorState, presentArr })

    // Set Correct
    const setAbsent = (attemptNum, updatedColorState, absentArr) => dispatchKey({ type: ACTIONS.SET_ABSENT, attemptNum, updatedColorState, absentArr }) 

    // game state context values
    const value = {
        setTiles,
        setCorrect,
        setPresent,
        setAbsent,
        keyState
    }
    // Returning the provider
    return (
        <KeyContext.Provider value={value} >
            {children}
        </KeyContext.Provider>
    )
}