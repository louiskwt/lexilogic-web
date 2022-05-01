import React from 'react'
import GameTile from '../GameTile/GameTile'
import './styles.css'
// Import context
import { useKey } from '../../../context/KeyContext'

const GameRow = ({ length, attemptArr, row }) => {
  const { keyState } = useKey()
  return (
    <div className='row' style={{gridTemplateColumns: `repeat(${length}, 1fr)` }}>
       { attemptArr.map((letter, index) => 
          <GameTile key={index} letter={letter} state={keyState.colorState[row][index]}  />
        )} 
    </div>
  )
}

export default GameRow