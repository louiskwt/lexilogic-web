import React from 'react'
import './styles.css'
import { FaQuestionCircle } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'
import { useWord } from '../../context/WordContext'
import { usePopUp } from '../../context/PopUpContext'
import Loader from '../Loader/Loader'
import SoundBtn from '../SoundBtn/SoundBtn'

const Navbar = () => {
  //Context States
  const { wordState, showSoundHint } = useWord()
  const { openPage } = usePopUp()

  return (
    <div className='game-navbar'>
          <div className='left'>
              <span onClick={() => openPage('question')}><FaQuestionCircle size={25} /> </span> 
          </div>
      <div className='word'> 
          {wordState.loading ? <Loader /> : (
            <>
              <h3>
                {wordState.meaning} ({wordState.pos}) 
              </h3>
          
              {
                wordState.showSound && <SoundBtn url={`sounds/words/${wordState.word}.mp3`} />  
              }
              {
                !wordState.showSound && <button className='ios-btn' onClick={showSoundHint}>
                +聲音提示
              </button>
              }  
              
            </>       
           )}
      </div>
        <div className='right'>
        <span onClick={() => openPage('ranking')}>
            <BsFillBarChartFill size={25} />
          </span>
         </div>
    </div>
  )
}

export default Navbar