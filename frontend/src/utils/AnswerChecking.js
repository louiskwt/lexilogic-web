// check guess
export const checkGuess = (attempts, attemptNum, ans, notify, setNext, setLose, setWin) => {
    let currentGuess = attempts[attemptNum]
    let guess = currentGuess.join('')
    // Warn the user for not filling all the tiles
    if (guess.length < ans.length) {
        notify('error', '請先填滿所有空格', 'dark')
        return
    }
    // Moving on the next row
    if (attemptNum - 1 !== 0 && guess !== ans) {
        setNext()
        return
    }
    // Losing situation (run out of guess without entering the correct word)
    if (attemptNum - 1 === 0 && guess !== ans) {
        notify('warn', '噢...繼續努力🥲', 'dark')
        setLose(guess)
        return
    }
    // Winning situation (entered the correct word)
    if (guess === ans) {
        notify('success', '正確～好叻呀 🥳', 'dark')
        setWin(guess)
        return
    }
}   

// Check key color
export const checkKeyColor = (attempts, attemptNum, ans, setCorrect, setPresent, setAbsent, keyState) => {
    let rightGuess = Array.from(ans)
    let currentGuess = attempts[attemptNum]
    // checkkey color by looping through each letter and compare against the right answer
    for (let i = 0; i < ans.length; i++) {
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        let updatedColorState = keyState.colorState[6 - attemptNum] // 6 - attemptNum to start from the top
        // if the correct answer contains the letter entered 
        if (letterPosition !== -1) {
            // if the letter appears in the same position as the anwer
            if (currentGuess[i] === rightGuess[i]) {
                updatedColorState[i] = 'correct'
                let updatedKeyState = keyState['correct']
                updatedKeyState.push(currentGuess[i])
                const correctArray = [...new Set(updatedKeyState)]
                setCorrect(attemptNum, updatedColorState, correctArray)
            } else {
                updatedColorState[i] = 'present'
                let updatedKeyState = keyState['present']
                updatedKeyState.push(currentGuess[i])
                const presentArray = [...new Set(updatedKeyState)]
                setPresent(attemptNum, updatedColorState, presentArray)
            }
        } else {
            // the correct answer does not contain the letter entered
            updatedColorState[i] = 'absent'
            let updatedKeyState = keyState['absent']
            updatedKeyState.push(currentGuess[i])
            const absentArray = [...new Set(updatedKeyState)]
            setAbsent(attemptNum, updatedColorState, absentArray)
        }
    }
}