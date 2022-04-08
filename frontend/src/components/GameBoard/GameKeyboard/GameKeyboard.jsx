import React, { useEffect, useRef } from 'react'
import './styles.css'
import { useGameState } from '../../../context/GameContext'
import { useWordState } from '../../../context/GameContext'

const GameKeyBoard = () => { 
  const btn = {
      firstRow: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      secondRow: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      thirdRow: ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']
  }

  const { gameState,  setGameState, setAttempts, attempts, setColorState, colorState } = useGameState()
  const wordState = useWordState()

  const word = wordState.word
  let nextLetter = gameState.nextLetter
  let guessRemaining = gameState.guessRemaining

  // check guess
  const checkGuess = (attemptNum, ans) => {
      let rightGuess = Array.from(ans)
      let currentGuess = attempts[attemptNum]

      if (currentGuess.join('').length < ans.length) {
            alert('Not enough word')
            return
      }

      // answer checking
      for(let i = 0; i < ans.length; i++) {
          let letterPosition = rightGuess.indexOf(currentGuess[i])
          if (letterPosition !== -1) {
              if(currentGuess[i] === rightGuess[i]) {
                  let updatedColorState = colorState[attemptNum]
                   updatedColorState[i] = 'correct'
                   setColorState({...colorState, [attemptNum]: updatedColorState})
              } else {
                  let updatedColorState = colorState[attemptNum]
                  updatedColorState[i] = 'present'
                  setColorState({ ...colorState, [attemptNum]: updatedColorState })
              }
          } else {
              let updatedColorState = colorState[attemptNum]
              updatedColorState[i] = 'absent'
              setColorState({ ...colorState, [attemptNum]: updatedColorState })
          }
      }
      
      setGameState({...gameState, guessRemaining: gameState.guessRemaining -= 1, nextLetter: 0})
  }   

  // set up useRef to focus on game keyboard for keydown functions   
  const keyboard = useRef(null);

  useEffect(() => {
    keyboard.current.focus()
  }, [])

// handle game keyboard input

    const handleClick = (e) => {    
        // handling non-enter click 
        if(nextLetter < word.length && e.target.textContent !== 'enter' && e.target.textContent !== 'del') {
            // console.log(attempts)
            // console.log(attempts[guessRemaining])
            let targetArr = attempts[guessRemaining]
            targetArr[nextLetter] = e.target.textContent
            // console.log(targetArr)
            let updatedAttempts = {
                                    ...attempts,
                                    [guessRemaining]: targetArr
                                }
            // console.log(updatedAttempts)
            setAttempts(updatedAttempts)
            setGameState({...gameState, nextLetter: nextLetter += 1})
        }

        // handling delete
        if(nextLetter > 0 && e.target.textContent === 'del') {
            console.log('fired')
            let targetArr = attempts[guessRemaining]
            let prev = nextLetter - 1
            console.log(prev)
            targetArr[prev] = ''
            console.log(targetArr)

            let updatedAttempts = {
                ...attempts,
                [guessRemaining]: targetArr
            }
            // console.log(updatedAttempts)
            setAttempts(updatedAttempts)
            setGameState({ ...gameState, nextLetter: prev })
        }

        // answer checking logic
        if(e.target.textContent === 'enter') {
            console.log('fired') 
            checkGuess(guessRemaining, word);
        }

    }

    const handleKeyPress = (e) => {
        console.log(e.key)
        // non-enter click 
        if (nextLetter < word.length && e.key !== 'Enter' && e.key !== 'Backspace') {
            let targetArr = attempts[guessRemaining]
            targetArr[nextLetter] = e.key
            // console.log(targetArr)
            let updatedAttempts = {
                ...attempts,
                [guessRemaining]: targetArr
            }
            // console.log(updatedAttempts)
            setAttempts(updatedAttempts)
            setGameState({ ...gameState, nextLetter: nextLetter += 1 })
        }

        // delete
        if (nextLetter > 0 && e.key === 'Backspace') {
            // console.log('fired')
            let targetArr = attempts[guessRemaining]
            let prev = nextLetter - 1
            targetArr[prev] = ''

            let updatedAttempts = {
                ...attempts,
                [guessRemaining]: targetArr
            }
            // console.log(updatedAttempts)
            setAttempts(updatedAttempts)
            setGameState({ ...gameState, nextLetter: prev })
        }

        // answer checking logic
        if (e.key === 'Enter') {
            console.log('fired')
            checkGuess(guessRemaining, word);
        }
    }

  return (
    <div id="keyboard-container"  tabIndex={0} ref={keyboard} onKeyDown={handleKeyPress}>
        <div className="keyboard-row">
            {btn.firstRow.map(letter => (
                <button key={letter}  onClick={handleClick} >{letter}</button>
            ))}
        </div>
        <div className="keyboard-row">
            <div className="spacer-half"></div>
            {btn.secondRow.map(letter => (
                <button key={letter} onClick={handleClick}>{letter}</button>
            ))}
            <div className="spacer-half"></div>
        </div>
        <div className="keyboard-row">
              {btn.thirdRow.map(letter => (
                  <button key={letter} onClick={handleClick}>{letter}</button>
              ))}
        </div>
    </div>
  )
}

export default GameKeyBoard