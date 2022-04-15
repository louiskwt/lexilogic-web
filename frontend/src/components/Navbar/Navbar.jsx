import React from 'react'
import './styles.css'
import { FaQuestionCircle } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'
import { useWordState, useLoaderState, usePopUpState } from '../../context/GameContext'
import Loader from '../Loader/Loader'

const Navbar = () => {
  const { wordState } = useWordState()
  const { loading } = useLoaderState()
  const { setPage, setPageContent } = usePopUpState()
  const handleOpen = (content) => {
    setPageContent(content)
    setPage('100%')
  }

  return (
    <div className='game-navbar'>
          <div className='left'>
              <span onClick={() => handleOpen('question')}><FaQuestionCircle size={30} /> </span> 
          </div>
      <div className='word'> 
          {loading ? <Loader /> : (<h2>{wordState.meaning} ({wordState.pos}) </h2>)}
      </div>
        <div className='right'>
          <span onClick={() => handleOpen('ranking')}>
            <BsFillBarChartFill size={30} />
          </span>
         </div>
    </div>
  )
}

export default Navbar