import React, { useContext, useReducer, useEffect } from 'react';
import axios from 'axios'

const API_URL = 'api/word/'

// Creating context with useContext hooks
const WordContext = React.createContext()

// Export the context
export function useWord() {
    return useContext(WordContext)
}

// Initial Word State
const initialWordState = {
    word: '',
    pos: '',
    tag: '',
    loading: true,
    initial: true
}

// Actions Constant
const ACTIONS = {
    LOAD_WORD: 'load-word',
    SET_LOADING: 'set-loading'
}

// Word Reducer
const reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.LOAD_WORD:
            return {
                ...state,
                meaning: action.res.data.meaning,
                word: action.res.data.word,
                pos: action.res.data.pos,
                tag: action.res.data.tags[0],
                loading: false
            };
        case ACTIONS.SET_LOADING:
            return {
                word: '',
                pos: '',
                tag: '',
                loading: true
            }
        default:
            return state;
    }
    
}

// Word provider
export function WordProvider({children}) {
    // word reducer
    const [wordState, dispatch] = useReducer(reducer, initialWordState)

    // Set loading
    const setLoading = () => {
        dispatch({ type: ACTIONS.SET_LOADING })
    }

    // word context values
    const value = { wordState, setLoading }

    // Fetch the word in context 
    useEffect(() => {
        const fetchWord = async () => {
            const res = await axios.get(API_URL)
            console.log(res)
            dispatch({ type: ACTIONS.LOAD_WORD, res})
        }
        fetchWord().catch(console.error)
    }, [wordState.loading])

    return (
        <WordContext.Provider value={value} >
            {
            
                    children  
            }
        </WordContext.Provider>
    )
}