import React, { useEffect } from 'react'
import GameRow from '../../GamePieces/GameRow/GameRow'
import GameButtons from '../../GamePieces/GameButtons/GameButtons'
import './styles.css'
import { useWordState } from '../../../context/GameContext'
import { useGameState } from '../../../context/GameContext'
import GameKeyBoard from '../GameKeyBoard/GameKeyBoard'


const Board = () => {
    const { wordState } = useWordState()
    const { attempts, setAttempts, setColorState } = useGameState()
    const row = []
    const len = wordState.word.length

    // Set up the board
    useEffect(() => {
        
         setAttempts({
             6: [...Array(len).fill('')],
             5: [...Array(len).fill('')],
             4: [...Array(len).fill('')],
             3: [...Array(len).fill('')],
             2: [...Array(len).fill('')],
             1: [...Array(len).fill('')],
        })
        setColorState({
            6: [...Array(len).fill('')],
            5: [...Array(len).fill('')],
            4: [...Array(len).fill('')],
            3: [...Array(len).fill('')],
            2: [...Array(len).fill('')],
            1: [...Array(len).fill('')],
        })

    }, [len, setAttempts, setColorState])

    if (attempts) {
        for (let i = 0; i < 6; i++) {
            row.push(<GameRow row={6 - i} length={len} key={i} attemptArr={attempts[6 - i]} />)
        }
    }


    return (
        <div id='board-container' >
            <GameButtons />
            <div id='board'>
                {row}
            </div>
            <GameKeyBoard />
        </div>
    )
}

export default Board