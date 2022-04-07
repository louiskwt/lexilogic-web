import React from 'react'
import './styles.css'
import { useGameState } from '../../../context/GameContext'

const GameTile = ({letter, attempt}) => {
  const { letterState } = useGameState()
  let classList = 'letter-box'
  if (letterState[attempt].correct.includes(letter)) {
    classList += ' correct'
  } else if (letterState[attempt].present.includes(letter)) {
    classList += ' present'
  } else if (letterState[attempt].absent.includes(letter)) {
    classList += 'absent'
  }
  
  return (
    <div className={classList}>{letter}</div>
  )
}

export default GameTile