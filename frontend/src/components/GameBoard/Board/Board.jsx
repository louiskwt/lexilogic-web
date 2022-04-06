import React, { useEffect } from 'react'
import GameRow from '../../GamePieces/GameRow/GameRow'
import './styles.css'
import { useWordState } from '../../../context/GameContext'
import { useGameState } from '../../../context/GameContext'


const Board = () => {
    const wordState = useWordState()
    const { attempts, setAttempts } = useGameState()
    const row = []
    const len = wordState.word.length

    useEffect(() => {
         setAttempts({
             6: [...Array(len).fill('')],
             5: [...Array(len).fill('')],
             4: [...Array(len).fill('')],
             3: [...Array(len).fill('')],
             2: [...Array(len).fill('')],
             1: [...Array(len).fill('')],
        })
    }, [len, setAttempts])

    if(attempts) {
        for (let i = 0; i < 6; i++) {
            row.push(<GameRow attempt={i} length={len} key={i} attemptArr={attempts[6 - i]} />)
        }
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