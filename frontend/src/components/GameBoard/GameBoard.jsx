import React from 'react'
import Board from './Board/Board'
import './styles.css'

const GameBoard = () => {

  return (
        <div id='game'>
              <Board />
              <div>keyboard</div>
        </div> 
  )
}

export default GameBoard