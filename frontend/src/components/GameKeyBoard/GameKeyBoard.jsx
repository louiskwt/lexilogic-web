import React, { useEffect, useRef } from 'react'
import './styles.css'
import KeyboardKey from '../GamePieces/KeyboardKey/KeyboardKey'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkGuess, checkKeyColor } from '../../utils/AnswerChecking';

// Bring in contexts
import { useGame } from '../../context/GameContext';
import { useWord } from '../../context/WordContext';
import { useKey } from '../../context/KeyContext';

const GameKeyBoard = () => { 

    const { setWin, setLose, setNext, setMove, setDelete, gameState } = useGame()
    const {setCorrect, setAbsent, setPresent, keyState} = useKey()
    const { wordState } = useWord()

    //   Key board key set up
    const btn = {
        firstRow: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        secondRow: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        thirdRow: ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']
    }
    //  React toastify for notification toast
    const notify = (type, str, theme) => toast[type](str, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme
    })

    const ans = wordState.word
    const attemptNum = gameState.guessRemaining;
    const attempts = gameState.attempts
    const nextLetter = gameState.nextLetter;

  
    // set up useRef to focus on game keyboard for keydown functions   
    const keyboard = useRef(null);

    useEffect(() => {
        keyboard.current.focus()
    }, [])

    // handling keyboard click
    const handleClick = (e) => {    
        console.log(e.target.textContent)
        // handling non-enter click 
        if(nextLetter < ans.length && e.target.textContent !== 'enter' && e.target.textContent !== 'del' && gameState.end !== true) {
             let targetArr = attempts[attemptNum]
             targetArr[nextLetter] = e.target.textContent
         
            setMove(e.key, targetArr)
        }

        // handling delete
        if (nextLetter > 0 && e.target.textContent === 'del' && gameState.end !== true) {
            console.log('delete fired')
            let prev = nextLetter - 1
            let targetArr = attempts[attemptNum]
            targetArr[prev] = ''
            setDelete(prev, targetArr)
        }

        // answer checking logic
        if (e.target.textContent === 'enter' && gameState.end !== true) {
            checkKeyColor(attempts, attemptNum, ans, setCorrect, setPresent, setAbsent, keyState)
            checkGuess(attempts, attemptNum, ans, notify, setNext, setLose, setWin);
        }
    }

    // handling key press
    const handleKeyPress = (e) => {
        const re = /^[a-z]{1}$/
        //  Check if the key press is a letter, enter, or blackspace
        if (e.key !== 'Enter' &&  e.key !== 'Backspace' && !re.test(e.key)) {
            return
        }

        // non-enter click 
        if (nextLetter < ans.length && e.key !== 'Enter' && e.key !== 'Backspace' && gameState.end !== true) {
            let targetArr = attempts[attemptNum]
            targetArr[nextLetter] = e.key
            setMove(e.key, targetArr)
        }

        // delete
        if (nextLetter > 0 && e.key === 'Backspace' && gameState.end !== true) {
            // console.log('fired')
            let prev = nextLetter - 1
            let targetArr = attempts[attemptNum]
            targetArr[prev] = ''
            setDelete(prev, targetArr)
        }

        // answer checking logic
        if (e.key === 'Enter' && gameState.end !== true) {
            console.log('fired')
            checkKeyColor(attempts, attemptNum, ans, setCorrect, setPresent, setAbsent, keyState)
            checkGuess(attempts, attemptNum, ans, notify, setNext, setLose, setWin);
        }
    }

  return (
    <div id="keyboard-container"  tabIndex={0} ref={keyboard} onKeyDown={handleKeyPress}>
        <div className="keyboard-row">
            {btn.firstRow.map(letter => (
                <KeyboardKey letter={letter} handleClick={handleClick} keyState={keyState} key={letter} />
            ))}
        </div>
        <div className="keyboard-row">
            <div className="spacer-half"></div>
            {btn.secondRow.map(letter => (
                <KeyboardKey letter={letter} handleClick={handleClick} keyState={keyState} key={letter} />

            ))}
            <div className="spacer-half"></div>
        </div>
        <div className="keyboard-row">
              {btn.thirdRow.map(letter => (
                  <KeyboardKey letter={letter} handleClick={handleClick} keyState={keyState} key={letter} />
              ))}
        </div>
        <ToastContainer />
    </div>
  )
}

export default GameKeyBoard