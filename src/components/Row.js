import React from "react"
import Column from "./Column"

const Row = ({ item, row }) => {
  return (
    <div className="guess-row">
      {item.map((value, i) => (
        <Column key={i} letter={value.letter} col={i} color={value.color} />
      ))}
    </div>
  )
}

export default Row
