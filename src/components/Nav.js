import React from "react"
import HelpIcon from "@mui/icons-material/Help"
import EqualizerIcon from "@mui/icons-material/Equalizer"
import "./Nav.css"

const Nav = () => {
  return (
    <div className="nav">
      <HelpIcon />
      <div>
        <h1>wordle</h1>
      </div>
      <EqualizerIcon />
    </div>
  )
}
export default Nav
