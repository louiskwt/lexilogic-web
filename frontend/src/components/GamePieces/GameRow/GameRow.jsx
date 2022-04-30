import React from 'react'
import GameTile from '../GameTile/GameTile'
import './styles.css'
import { useGame } from '../../../context/GameContext'

const GameRow = ({ length, attemptArr, row }) => {
  const { keyState } = useGame()
  return (
    <div className='row' style={{gridTemplateColumns: `repeat(${length}, 1fr)` }}>
       { attemptArr.map((letter, index) => 
          <GameTile key={index} letter={letter} state={keyState.colorState[row][index]}  />
        )} 
    </div>
  )
}

export default GameRow