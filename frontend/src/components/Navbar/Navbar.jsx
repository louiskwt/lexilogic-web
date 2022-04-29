import React, { useState } from 'react'
import './styles.css'
import { FaQuestionCircle } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'
import { useWordState, useLoaderState, usePopUpState } from '../../context/GameContext'
import Loader from '../Loader/Loader'
import SoundBtn from '../SoundBtn/SoundBtn'

const Navbar = () => {
  const { wordState } = useWordState()
  const { loading } = useLoaderState()
  const { setPage, setPageContent } = usePopUpState()
  const [showSound, setShow] = useState(false)


  const handleOpen = (content) => {
    setPageContent(content)
    setPage('100%')
  }

  const toggleSound = () => { setShow(!showSound) }

  return (
    <div className='game-navbar'>
          <div className='left'>
              <span onClick={() => handleOpen('question')}><FaQuestionCircle size={25} /> </span> 
          </div>
      <div className='word'> 
          {loading ? <Loader /> : (
            <>
              <h3>
                {wordState.meaning} ({wordState.pos}) 
              </h3>
          
              {
                showSound && <SoundBtn url={`sounds/words/${wordState.word}.mp3`} />  
              }
              {
              !showSound && <button className='ios-btn' onClick={toggleSound}>
                +聲音提示
              </button>
              }  
              
            </>       
           )}
      </div>
        <div className='right'>
          <span onClick={() => handleOpen('ranking')}>
            <BsFillBarChartFill size={25} />
          </span>
         </div>
    </div>
  )
}

export default Navbar