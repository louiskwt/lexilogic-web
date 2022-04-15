import React from 'react'
import GameTile from '../GamePieces/GameTile/GameTile'
import './styles.css'

const Instructions = () => {
    const firstEx = ['n', 'o', 'd', 'l', 'e']
    const secondEx = ['i', 'e', 'c', 'y']
    const thirdEx = ['d', 'o', 'n', 'n', 'e']

  return (
    <div className='instruction-page'>
        <h1>點樣玩 | How to Play</h1>
        <hr />
        <div className='instruction'>
            <p>這是 DSE 版的Wordle～</p>

            <p>答案是一個歷年DSE出現過的詞彙。你可以按照螢幕上方的中文意思，去用下方的小鍵盤拼出答案，而你有6次機會去拼出正確答案✅，放膽去試啦～</p>

            <p>提交答案時，按鍵盤中的 「 ENRER 」即可，如果你輸入了錯的字，可以按 「 del 」去刪除 </p>

            <p>每次按「 ENRER 」後，方格會變成不同顏色去為你提供更多提示</p>
        </div>
        <hr />
        <div className='example'>
            <h2>例子</h2>
            <div className='tile-row'>
                {firstEx.map((letter, index) => ( 
                   <GameTile key={index} letter={letter} state={(letter === 'e'? 'correct' : 'absent')} />
                ))}
                <p>答案： table</p>
            </div>
            <p>答案入面有 E ，而且位置是正確的</p>
              <div className='tile-row'>
                  {secondEx.map((letter, index) => (
                      <GameTile key={index} letter={letter} state={(letter === 'e' ? 'present' : 'absent')} />
                  ))}
                  <p>答案： easy</p>
              </div>
              <p>答案入面有 E ，但位置是不正確的</p>
              <div className='tile-row'>
                  {thirdEx.map((letter, index) => (
                      <GameTile key={index} letter={letter} state={'absent'} />
                  ))}
                  <p>答案： tummy</p>
              </div>
              <p>輸入的字不存在於答案</p>
        </div>
        <hr />
        <div className='footer'>
            <p>這個遊戲的原型 Wordle 是由Josh Wardle設計及開發，然後我只是參考Josh所開發的Wordle 去改做成這個DSE 版的 Wrodle</p>
        </div>
    </div>
  )
}

export default Instructions