import React, { useContext } from "react"
import { AppContext } from "../AppProvider"

const Key = ({ item }) => {
  const { clickedletter } = useContext(AppContext)
  const fgcolor = item.color === "#d8d8d8"
  return (
    <div
      className="keys"
      style={{ backgroundColor: item.color, color: fgcolor ? "black" : "white" }}
      onClick={() => clickedletter(item.letter)}>
      <p>
        <b>{item["letter"]}</b>
      </p>
    </div>
  )
}
export default Key
