import React from "react"
import Column from "./Column"

const Row = ({ item, row }) => {
  return (
    <div className="guess-row">
      {item.map((letter, i) => (
        <Column key={i} letter={letter} col={i} />
      ))}
    </div>
  )
}
export default Row
