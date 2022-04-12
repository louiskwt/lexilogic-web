import React from 'react'
import { useGameState, useModalState } from '../../../context/GameContext'
import { useWordState } from '../../../context/GameContext'
import './styles.css'
import axios from 'axios'
const API_URL = 'api/word/'

const GameButton = () => {
    const { gameState, setGameState, setKeyState } = useGameState()
    const { setWordState } = useWordState()
    const { setModalState } = useModalState()
    const end = gameState.end

    const nextWord = () => {
        const fetchWord = async () => {
            const response = await axios.get(API_URL)
            setWordState(response.data)

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