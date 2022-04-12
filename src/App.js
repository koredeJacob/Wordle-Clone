import React, { useContext } from "react"
import Nav from "./components/Nav"
import Game from "./components/Game"
import Help from "./components/Help"
import "./App.css"
import { AppContext } from "./AppProvider"

const App = () => {
  const { Howtoplay } = useContext(AppContext)

  if (Howtoplay) {
    return <Help />
  }

  return (
    <>
      <Nav />
      <Game />
    </>
  )
}

export default App
