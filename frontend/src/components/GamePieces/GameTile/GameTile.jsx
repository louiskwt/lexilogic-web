import React from 'react'
import './styles.css'

const GameTile = ({letter, guess}) => {
 

  return (
    <div className={'letter-box'}>{letter}</div>
  )
}

export default GameTile