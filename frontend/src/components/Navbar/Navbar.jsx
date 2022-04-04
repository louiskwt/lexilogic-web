import React from 'react'
import './styles.css'
import { FaDelicious } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'
import { useWordState } from '../../context/GameContext'

const Navbar = () => {
  const wordState = useWordState()
  return (
    <div className='game-navbar'>
          <div className='left'>
              <h1><FaDelicious size={35} /> </h1> 
          </div>
      <div className='word'><h2>{wordState.meaning} ({wordState.pos}) </h2></div>
        <div className='right'><BsFillBarChartFill size={35} /></div>
    </div>
  )
}

export default Navbar