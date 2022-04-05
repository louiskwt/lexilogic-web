import React from 'react'
import GameTile from '../GameTile/GameTile'
import './styles.css'

const GameRow = ({ length, attemptArr }) => {

  let tiles = []
  for(let i = 0; i < length; i++) {
    tiles.push(<GameTile key={i} />)
  }  

  return (
    <div className='row' style={{gridTemplateColumns: `repeat(${length}, 1fr)` }}>
       { attemptArr.map((attempt, index) => 
          <GameTile key={index} value={attempt} />
        )} 
    </div>
  )
}

export default GameRow