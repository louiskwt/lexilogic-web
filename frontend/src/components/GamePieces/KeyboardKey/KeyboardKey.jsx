import React from 'react'
import './styles.css'


const KeyboardKey = ({ handleClick, letter, keyState}) => {
    let id = ''

    if(keyState['correct'].includes(letter)) {
        id += 'correct-key'
    }

    if (keyState['present'].includes(letter) && !keyState['correct'].includes(letter)) {
        id += 'present-key'
    }

    if (keyState['absent'].includes(letter)) {
        id += 'absent-key'
    }

    return (
        <button id={id} onClick={handleClick} >{letter}</button>
    )
}

export default KeyboardKey