import React, { useEffect, useRef } from 'react'
import './styles.css'

const GameKeyBoard = () => { 
  const btn = {
      firstRow: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      secondRow: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      thirdRow: ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']
  }
  const handleClick = (e) => {
        console.log(e.target.textContent)
  }

  const keyboard = useRef(null);

  useEffect(() => {
    keyboard.current.focus()
  }, [])

  const handleKeyPress = (e) => {
      console.log(e.key)
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