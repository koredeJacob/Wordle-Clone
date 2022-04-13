import React from "react"

const Column = ({ letter, color }) => {
  const fgcolor = color === "white" ? "black" : "white"

  return (
    <div className="guess-column" style={{ backgroundColor: color, color: fgcolor }}>
      <h2 className="letter">{letter}</h2>
    </div>
  )
}

export default Column
