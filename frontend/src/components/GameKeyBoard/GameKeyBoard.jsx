import React, { useEffect, useRef } from 'react'
import './styles.css'
import KeyboardKey from '../GamePieces/KeyboardKey/KeyboardKey'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GameKeyBoard = () => { 
  const btn = {
      firstRow: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      secondRow: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      thirdRow: ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']
  }
//   React toastify
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

  

  // check guess
//   const checkGuess = (attemptNum, ans) => {
//       let rightGuess = Array.from(ans)
//       let currentGuess = attempts[attemptNum]

//       if (currentGuess.join('').length < ans.length) {
//             notify('error', '請先填滿所有空格', 'dark')
//             return
//       }

//       // answer checking
//       for(let i = 0; i < ans.length; i++) {
//           let letterPosition = rightGuess.indexOf(currentGuess[i])
//           if (letterPosition !== -1) {
//               if(currentGuess[i] === rightGuess[i]) {
//                     let updatedColorState = colorState[attemptNum]
//                     updatedColorState[i] = 'correct'
                   
//                     setColorState({...colorState, [attemptNum]: updatedColorState})

//                   let updatedKeyState = keyState['correct']
//                   updatedKeyState.push(currentGuess[i])
//                   setKeyState({...keyState, correct: [...new Set(updatedKeyState)]})
//               } else {
//                   let updatedColorState = colorState[attemptNum]
//                   updatedColorState[i] = 'present'
//                   setColorState({ ...colorState, [attemptNum]: updatedColorState })

//                   let updatedKeyState = keyState['present']
//                   updatedKeyState.push(currentGuess[i])
//                   setKeyState({ ...keyState, present: [...new Set(updatedKeyState)] })
//               }
//           } else {
//               let updatedColorState = colorState[attemptNum]
//               updatedColorState[i] = 'absent'
//               setColorState({ ...colorState, [attemptNum]: updatedColorState })

//               let updatedKeyState = keyState['absent']
//               updatedKeyState.push(currentGuess[i])
//               setKeyState({ ...keyState, absent: [...new Set(updatedKeyState)] })
//           }
//       }
//       if(gameState.guessRemaining - 1 !== 0) {
//           setGameState({ ...gameState, guessRemaining: gameState.guessRemaining -= 1, nextLetter: 0 })
//       } else if (currentGuess.join('') !== ans) {
//           let updatedWrongGuess = gameState.wrongGuess
//           updatedWrongGuess.push(ans)
//           notify('warn', '噢...繼續努力🥲', 'dark')
//           setGameState({ ...gameState, wrongGuess: updatedWrongGuess, end: true, guessRemaining: 5, nextLetter: 0})
//           return
//       }
      

//       if(currentGuess.join('') === ans) {
//           let updatedCorrectGuess = gameState.correctGuess
//           updatedCorrectGuess.push(ans)
//           notify('success', '正確～好叻呀 🥳', 'dark')
//           setGameState({ ...gameState, correctGuess: updatedCorrectGuess, end: true, guessRemaining: 5, nextLetter: 0, })
//           return
//       }

//   }   

  // set up useRef to focus on game keyboard for keydown functions   
  const keyboard = useRef(null);

  useEffect(() => {
    keyboard.current.focus()
  }, [])

    // handling keyboard click

    // const handleClick = (e) => {    
    //     // handling non-enter click 
    //     if(nextLetter < word.length && e.target.textContent !== 'enter' && e.target.textContent !== 'del' && gameState.end !== true) {
    //         // console.log(attempts)
    //         // console.log(attempts[guessRemaining])
    //         let targetArr = attempts[guessRemaining]
    //         targetArr[nextLetter] = e.target.textContent
    //         // console.log(targetArr)
    //         let updatedAttempts = {
    //                                 ...attempts,
    //                                 [guessRemaining]: targetArr
    //                             }
    //         // console.log(updatedAttempts)
    //         setAttempts(updatedAttempts)
    //         setGameState({...gameState, nextLetter: nextLetter += 1})
    //     }

    //     // handling delete
    //     if (nextLetter > 0 && e.target.textContent === 'del' && gameState.end !== true) {
            
    //         let targetArr = attempts[guessRemaining]
    //         let prev = nextLetter - 1
    //         console.log(prev)
    //         targetArr[prev] = ''
    //         console.log(targetArr)

    //         let updatedAttempts = {
    //             ...attempts,
    //             [guessRemaining]: targetArr
    //         }
    //         // console.log(updatedAttempts)
    //         setAttempts(updatedAttempts)
    //         setGameState({ ...gameState, nextLetter: prev })
    //     }

    //     // answer checking logic
    //     if (e.target.textContent === 'enter' && gameState.end !== true) {
            
    //         checkGuess(guessRemaining, word);
    //     }

    // }

    // // handling key press
    // const handleKeyPress = (e) => {
    //     const re = /^[a-z]{1}$/

    //     if (e.key !== 'Enter' &&  e.key !== 'Backspace' && !re.test(e.key)) {
    //         return
    //     }

    //     // non-enter click 
    //     if (nextLetter < word.length && e.key !== 'Enter' && e.key !== 'Backspace' && gameState.end !== true) {
    //         let targetArr = attempts[guessRemaining]
    //         targetArr[nextLetter] = e.key
    //         // console.log(targetArr)
    //         let updatedAttempts = {
    //             ...attempts,
    //             [guessRemaining]: targetArr
    //         }
    //         // console.log(updatedAttempts)
    //         setAttempts(updatedAttempts)
    //         setGameState({ ...gameState, nextLetter: nextLetter += 1 })
    //     }

    //     // delete
    //     if (nextLetter > 0 && e.key === 'Backspace' && gameState.end !== true) {
    //         // console.log('fired')
    //         let targetArr = attempts[guessRemaining]
    //         let prev = nextLetter - 1
    //         targetArr[prev] = ''

    //         let updatedAttempts = {
    //             ...attempts,
    //             [guessRemaining]: targetArr
    //         }
    //         // console.log(updatedAttempts)
    //         setAttempts(updatedAttempts)
    //         setGameState({ ...gameState, nextLetter: prev })
    //     }

    //     // answer checking logic
    //     if (e.key === 'Enter' && gameState.end !== true) {
    //         console.log('fired')
    //         checkGuess(guessRemaining, word);
    //     }
    // }

 
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
                <KeyboardKey letter={letter}  keyState={keyState} key={letter} />

            ))}
            <div className="spacer-half"></div>
        </div>
        <div className="keyboard-row">
              {btn.thirdRow.map(letter => (
                  <KeyboardKey letter={letter} keyState={keyState} key={letter} />
              ))}
        </div>
        <ToastContainer />
    </div>
  )
}

export default GameKeyBoard