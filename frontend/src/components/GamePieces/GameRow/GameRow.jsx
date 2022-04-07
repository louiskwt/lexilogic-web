import React from 'react'
import GameTile from '../GameTile/GameTile'
import './styles.css'

const GameRow = ({ length, letterArr, attempt }) => {
  return (
    <div className='row' style={{gridTemplateColumns: `repeat(${length}, 1fr)` }}>
       { letterArr.map((letter, index) => 
          <GameTile key={index} letter={letter} attempt={attempt + 1} />
        )} 
    </div>
  )
}

export default GameRow