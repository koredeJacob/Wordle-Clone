import React from "react"

const Column = ({ letter, col }) => {
  return (
    <div className="guess-column">
      <h2 className="letter">{letter + col}</h2>
    </div>
  )
}
export default Column
