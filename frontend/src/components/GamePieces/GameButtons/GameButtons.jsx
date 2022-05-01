import React from 'react'
import './styles.css'

// import contexts
import { useWord } from '../../../context/WordContext'
import { useGame } from '../../../context/GameContext'
import { usePopUp } from '../../../context/PopUpContext'


const GameButton = () => {
    const { setLoading } = useWord() // pull in to load new word
    const { openModal } = usePopUp()
    const { gameState } = useGame()

    return (
        <div className='btn-container'>
            {gameState.end && (
                <>
                      <button id='record-btn' onClick={openModal}>我的紀錄</button>
                      <button id='next-btn' onClick={setLoading}>下一個</button>
                </>
              )}
        </div>
    )
}

export default GameButton