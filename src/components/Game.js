import React, { useContext } from "react"
import Row from "./Row"
import Key from "./Key"
import { AppContext } from "../AppProvider"
import CancelIcon from "@mui/icons-material/Cancel"

//component renders appopriate game data like states grid and keyboard
const Game = () => {
  const {
    Word,
    Board,
    Key1,
    Key2,
    Key3,
    Played,
    Winpercent,
    Maxstreak,
    Result,
    Current,
    Guess,
    Visible,
    handleVisible,
    Invalidword,
    Playagain,
    newGame
  } = useContext(AppContext)

  let isvisible = Visible ? "visible" : "hidden"

  return (
    <>
      <div className="game">
        {Invalidword && <div className="invalid">not in word list</div>}
        <div className="guess">
          {Board &&
            Board.map((item, i) => {
              return <Row key={i} item={item} row={i} />
            })}
        </div>

        {Playagain && (
          <div className="playagain">
            {Result ? <p>yay!! you guessed the word</p> : <p>the word is {Word}</p>}
            <button className="playbutton" onClick={newGame}>
              Play again
            </button>
          </div>
        )}

        <div className="keyboard">
          <div className="key1">{Key1 && Key1.map((item, i) => <Key key={i} item={item} />)}</div>
          <div className="key2">{Key2 && Key2.map((item, i) => <Key key={i} item={item} />)}</div>
          <div className="key3">
            <Enter />
            {Key3 && Key3.map((item, i) => <Key key={i} item={item} />)}
            <Del />
          </div>
        </div>
      </div>

      <div className="stats" style={{ visibility: isvisible }}>
        <div className="cancel" onClick={() => handleVisible(false)}>
          <CancelIcon />
        </div>
        <h3 className="statsheader">STATISTICS</h3>
        <div className="statistics">
          <div className="played">
            <h2 className="played-figure">{Played}</h2>
            <p className="played-label">Played</p>
          </div>
          <div className="winpercent">
            <h2 className="win-figure">{Winpercent}</h2>
            <p className="win-percent">Win %</p>
          </div>
          <div className="current">
            <h2 className="current-figure">{Current}</h2>
            <p className="current-label">Current Streak</p>
          </div>
          <div className="maxstreak">
            <h2 className="max-figurw">{Maxstreak}</h2>
            <p className="max-label">Max Streak</p>
          </div>
        </div>
        <h3 className="guesses">GUESS DISTRIBUTION</h3>
        <div className="guess-distribution">
          {Guess && Guess.map((item, i) => <Guesses key={i} val={item} num={i} />)}
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

const Guesses = ({ val, num }) => {
  const { Guess } = useContext(AppContext)
  let total = Guess.reduce((tot, current) => (tot += current), 0)
  let barwidth = 5
  if (val) {
    barwidth = (val / total).toFixed(1) * 100
  }

  return (
    <div className="rowlabel">
      <div className="id">{num + 1}</div>
      <div className="bar" style={{ width: `${barwidth}%`, border: "1px solid black" }}>
        {val}
      </div>
    </div>
  )
}

export default Game
