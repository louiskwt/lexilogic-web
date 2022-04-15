import React from 'react'
import './styles.css'
import { usePopUpState } from '../../context/GameContext'
import Instructions from '../Instructions/Instructions'

const GamePage = () => {
    const { page, setPage, setPageContent, pageContent } = usePopUpState()
    const handleClose = () => {
        setPage('0%')
        setPageContent('')
    }

    return (
        //   Overlay
        <div className='overlay' style={{ height: `${page}`  }}>
            <span className='close-btn' onClick={handleClose}>&times;</span>
            <div className="overlay-content">
                {pageContent === 'question' && <Instructions/> }
                {pageContent === 'ranking' && <h1>排名榜正在努力開發中💪🏼 敬請期待😚</h1>}
            </div>
        </div>
    )
}

export default GamePage