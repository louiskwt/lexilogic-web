import React, { useEffect } from 'react'
import GameRow from '../GamePieces/GameRow/GameRow'
import GameButtons from '../GamePieces/GameButtons/GameButtons'
import './styles.css'
import { useWordState, useGameState, useLoaderState } from '../../context/GameContext'
import GameKeyBoard from '../GameKeyBoard/GameKeyBoard'
import Loader from '../Loader/Loader'


const GameBoard = () => {
    const { wordState } = useWordState()
    const { attempts, setAttempts, setColorState } = useGameState()
    const { loading } = useLoaderState()

    const row = []
    const len = wordState.word.length

    // Set up the board
    useEffect(() => {
         setAttempts({
             5: [...Array(len).fill('')],
             4: [...Array(len).fill('')],
             3: [...Array(len).fill('')],
             2: [...Array(len).fill('')],
             1: [...Array(len).fill('')],
        })
        setColorState({
            5: [...Array(len).fill('')],
            4: [...Array(len).fill('')],
            3: [...Array(len).fill('')],
            2: [...Array(len).fill('')],
            1: [...Array(len).fill('')],
        })

    }, [len, setAttempts, setColorState])

    if (attempts) {
        for (let i = 0; i < 5; i++) {
            row.push(<GameRow row={5 - i} length={len} key={i} attemptArr={attempts[5 - i]} />)
        }
    }


    return (
        <div id='board-container' >
            <GameButtons />
            { loading ? <Loader/> : (
                <>
                    <div id='board'>
                        {row}
                    </div>
                    <GameKeyBoard />
                </>
            ) }
        </div>
    )
}

export default GameBoard