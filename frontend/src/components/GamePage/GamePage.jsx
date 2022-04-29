import React from 'react'
import './styles.css'
import { usePopUp } from '../../context/PopUpContext'
import Instructions from '../Instructions/Instructions'

const GamePage = () => {
    const { popUp, closePage } = usePopUp()
    return (
        //   Overlay
        <div className='overlay' style={{ height: `${popUp.page}`  }}>
            <span className='close-btn' onClick={closePage}>&times;</span>
            <div className="overlay-content">
                {popUp.content === 'question' && <Instructions/> }
                {popUp.content === 'ranking' && <h1>排名榜正在努力開發中💪🏼 敬請期待😚</h1>}
            </div>
        </div>
    )
}

export default GamePage