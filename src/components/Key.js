import React from "react"

const Key = ({ item }) => {
  return (
    <div className="keys">
      <p>
        <b>{item["letter"]}</b>
      </p>
    </div>
  )
}
export default Key
