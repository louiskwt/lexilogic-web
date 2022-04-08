import React from 'react'
import './styles.css'

const GameTile = ({ letter, state }) => {
 
  let classList = 'letter-box'
  if(state === 'correct') {
    classList += ' correct'
  }
  if(state === 'present') {
    classList += ' present' 
  }

  if(state === 'absent') {
    classList += ' absent'
  }


  return (
    <div className={classList}>{letter}</div>
  )
}

export default GameTile