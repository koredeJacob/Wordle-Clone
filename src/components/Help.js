import React, { useContext } from "react"
import CancelIcon from "@mui/icons-material/Cancel"
import { AppContext } from "../AppProvider"

const Help = () => {
  const { showHelp } = useContext(AppContext)

  return (
    <div>
      <div className="cancel" onClick={() => showHelp(false)}>
        <CancelIcon />
      </div>
      <h3 className="howtoplay">HOW TO PLAY</h3>
      <p>
        guess the <b>WORDLE</b> in six tries
      </p>
      <p>Each guess must be a valid five letter word.Hit the enter button to submit</p>
      <p>
        After each guess,the colour of the tiles will change to show how close your guess was to the
        word
      </p>
      <h3>EXAMPLE</h3>
      <div className="example">
        <div className="block green">
          <p>
            <b>B</b>
          </p>
        </div>
        <div className="block">
          <p>
            <b>E</b>
          </p>
        </div>
        <div className="block">
          <p>
            <b>A</b>
          </p>
        </div>
        <div className="block">
          <p>
            <b>N</b>
          </p>
        </div>
        <div className="block">
          <p>
            <b>S</b>
          </p>
        </div>
      </div>
      <p>
        The letter <b>B</b> is in the word and in the correct spot
      </p>
      <div className="example">
        <div className="block">
          <p>
            <b>S</b>
          </p>
        </div>
        <div className="block yellow">
          <p>
            <b>P</b>
          </p>
        </div>
        <div className="block">
          <p>
            <b>O</b>
          </p>
        </div>
        <div className="block">
          <p>
            <b>R</b>
          </p>
        </div>
        <div className="block">
          <p>
            <b>T</b>
          </p>
        </div>
      </div>
      <p>
        The letter <b>P</b> is in the word but not in the correct spot
      </p>
      <div className="example">
        <div className="block">
          <p>
            <b>C</b>
          </p>
        </div>
        <div className="block">
          <p>
            <b>R</b>
          </p>
        </div>
        <div className="block grey">
          <p>
            <b>O</b>
          </p>
        </div>
        <div className="block">
          <p>
            <b>W</b>
          </p>
        </div>
        <div className="block">
          <p>
            <b>N</b>
          </p>
        </div>
      </div>
      <p>
        The letter <b>O</b> is not in the word in any spot
      </p>
      <p>
        <b>You can play as many times as you like</b>
      </p>
    </div>
  )
}

export default Help
