import React from 'react'
import GameRow from '../../GamePieces/GameRow/GameRow'
import './styles.css'

const Board = () => {
    const word = 'witness'  
    const row = []
    for(let i = 0; i < 6; i++) {
        row.push(<GameRow length={word.length}/>)
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