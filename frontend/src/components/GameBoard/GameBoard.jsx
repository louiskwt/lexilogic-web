import React from 'react'
import Board from './Board/Board'
import GameKeyBoard from './GameKeyBoard/GameKeyBoard'
import './styles.css'

const GameBoard = () => {

  return (
        <div id='game'>
              <Board />
              <GameKeyBoard />
        </div> 
  )
}

export default GameBoard