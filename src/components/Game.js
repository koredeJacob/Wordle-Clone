import React, { useContext } from "react"
import Row from "./Row"
import Key from "./Key"
import { AppContext } from "../AppProvider"

const Game = () => {
  const { Board, Key1, Key2, Key3 } = useContext(AppContext)
  return (
    <div className="game">
      <div className="guess">
        {Board.map((item, i) => {
          return <Row key={i} item={item} row={i} />
        })}
      </div>
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
  )
}

const Enter = () => {
  return (
    <div className="enter">
      <p>ENTER</p>
    </div>
  )
}
const Del = () => {
  return (
    <div className="del">
      <p>DEL</p>
    </div>
  )
}
export default Game
