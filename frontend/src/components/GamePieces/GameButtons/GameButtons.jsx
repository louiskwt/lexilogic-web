import React from 'react'
import { useGameState, useModalState } from '../../../context/GameContext'
import { useWordState } from '../../../context/GameContext'
import './styles.css'
import axios from 'axios'
const API_URL = 'api/word/'

const GameButton = () => {
    const { gameState, setGameState, setKeyState, setAttempts, setColorState } = useGameState()
    const { setWordState, wordState } = useWordState()
    const { setModalState } = useModalState()
    const end = gameState.end

    // move on to the next word
    const nextWord = () => {
        const fetchWord = async () => {
            const response = await axios.get(API_URL)
            setWordState(response.data)

            const len = wordState.word.length

            setAttempts({
                6: [...Array(len).fill('')],
                5: [...Array(len).fill('')],
                4: [...Array(len).fill('')],
                3: [...Array(len).fill('')],
                2: [...Array(len).fill('')],
                1: [...Array(len).fill('')],
            })
            setColorState({
                6: [...Array(len).fill('')],
                5: [...Array(len).fill('')],
                4: [...Array(len).fill('')],
                3: [...Array(len).fill('')],
                2: [...Array(len).fill('')],
                1: [...Array(len).fill('')],
            })

        }
        fetchWord().catch(console.error)
        setGameState({...gameState, end: false})
        setKeyState({
            correct: [],
            present: [],
            absent: []
        })
    
    }

    return (
        <div className='btn-container'>
            {end && (
                <>
                      <button id='record-btn' onClick={() => setModalState('block')}>我的紀錄</button>
                      <button id='next-btn' onClick={nextWord}>下一個</button>
                </>
              )}
        </div>
    )
}

export default GameButton