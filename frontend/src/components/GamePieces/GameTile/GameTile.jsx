import React from 'react'
import './styles.css'

const GameTile = ({value}) => {
  return (
    <div className='letter-box'>{value}</div>
  )
}

export default GameTile