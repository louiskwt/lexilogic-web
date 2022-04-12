import React from 'react'
import { useGameState, useModalState } from '../../context/GameContext'
import './styles.css'

const Modal = () => {
    const { modalState, setModalState } = useModalState()
    const { gameState } = useGameState()
    const correctArr = gameState.correctGuess
    const wrongArr = gameState.wrongGuess
 
  return (
    <div className='modal' style={{ 'display': modalState }} onClick={() => setModalState('none')}>
        <div className="modal-content">
            <div className="modal-header">
                  <span className="close" onClick={() => setModalState('none')}>&times;</span>
                  <h1>我的記錄</h1>
            </div>
            <div className="modal-body">
                  {correctArr.length > 0 && correctArr.map((word, index) => (
                      <p key={index}>
                          {word} {' '} <span>✅</span>
                      </p>
                  ))}
                  {wrongArr.length > 0 && wrongArr.map((word, index) => (
                      <p key={index}>
                          {word} {' '} <span>❌</span>
                      </p>
                  ))}
            </div>
        </div>
    </div>
  )
}

export default Modal