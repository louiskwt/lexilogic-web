import React from 'react'
import './styles.css'
import { FaDelicious } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'



const Navbar = () => {
  return (
    <div className='game-navbar'>
          <div className='left'>
              <h1><FaDelicious size={35} /> </h1> 
          </div>
        <div className='word'><h1>oasis (n.) </h1></div>
        <div className='right'><BsFillBarChartFill size={35} /></div>
    </div>
  )
}

export default Navbar