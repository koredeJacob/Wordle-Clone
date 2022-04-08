import React, { useContext } from "react"
import Row from "./Row"
import Key from "./Key"
import { AppContext } from "../AppProvider"
import { Button } from "@mui/material"

const Game = () => {
  const { Word, Board, Key1, Key2, Key3, Result, Invalidword, Playagain } = useContext(AppContext)
  return (
    <>
      {Invalidword && <div>not in word list</div>}
      <div className="game">
        <div className="guess">
          {Board &&
            Board.map((item, i) => {
              return <Row key={i} item={item} row={i} />
            })}
        </div>
        {Playagain && (
          <div>
            {Result ? <p>yay!! you guessed the word</p> : <p>the word is {Word}</p>}
            <button>Playagain</button>
          </div>
        )}
        <div className="keyboard">
          <div className="key1">
            {Key1.map((item, i) => (
              <Key key={i} item={item} />
            ))}
          </div>
          <div className="key2">
            {Key2.map((item, i) => (
              <Key key={i} item={item} />
            ))}
          </div>

          <div className="key3">
            <Enter />
            {Key3.map((item, i) => (
              <Key key={i} item={item} />
            ))}
            <Del />
          </div>
        </div>
      </div>
    </>
  )
}

const Enter = () => {
  const { handleEnter } = useContext(AppContext)
  return (
    <div className="enter" onClick={handleEnter}>
      <p>ENTER</p>
    </div>
  )
}
const Del = () => {
  const { handleDel } = useContext(AppContext)
  return (
    <div className="del" onClick={handleDel}>
      <p>DEL</p>
    </div>
  )
}
export default Game
