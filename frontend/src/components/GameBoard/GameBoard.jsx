import React, { useEffect } from 'react'
import GameRow from '../GamePieces/GameRow/GameRow'
// import GameButtons from '../GamePieces/GameButtons/GameButtons'
import './styles.css'
// import GameKeyBoard from '../GameKeyBoard/GameKeyBoard'
import Loader from '../Loader/Loader'

// Import contexts
import { useWord } from '../../context/WordContext'
import { useGame } from '../../context/GameContext'

const GameBoard = () => {
    const { wordState } = useWord()
    const { setAttempts, setColors, gameState} = useGame()

    const len = wordState.word.length

    // Set up the board
    useEffect(() => {
         setAttempts(len)
         setColors(len)
    }, [len])


    return (
        <div id='board-container' >
            {/* <GameButtons /> */}
            { wordState.loading ? <Loader/> : (
                <>
                    <div id='board'>
                        {Object.keys(gameState.attempts).map((key, index) => (
                            <GameRow key={index} row={key} length={gameState.attempts[key].length} attemptArr={gameState.attempts[key]} />
                        ))}
                    </div>
       
                </>
            ) }
        </div>
    )
}

export default GameBoard

