import React from 'react'
import GameRow from '../../GamePieces/GameRow/GameRow'
import './styles.css'
import { useWordState } from '../../../context/GameContext'

const Board = () => {
    const wordState = useWordState()
    console.log(wordState.word.length)
    const row = []
    for(let i = 0; i < 6; i++) {
        row.push(<GameRow length={wordState.word.length
} key={i} />)
    }
    return (
        <div id='board-container' >
            <div id='board'>
                {row}
            </div>
        </div>
    )
}

export default Board