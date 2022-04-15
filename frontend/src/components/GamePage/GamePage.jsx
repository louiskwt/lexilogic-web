import React from 'react'
import './styles.css'
import { usePopUpState } from '../../context/GameContext'

const GamePage = () => {
    const { page, setPage, setPageContent } = usePopUpState()
    const handleClose = () => {
        setPage('0%')
        setPageContent('')
    }

    return (
        //   Overlay
        <div className='overlay' style={{ height: `${page}`  }}>
            <span className='close-btn' onClick={handleClose}>&times;</span>
            <div className="overlay-content">
                <p>Hello</p>
            </div>
        </div>
    )
}

export default GamePage