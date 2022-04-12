import React, { useContext } from "react"
import HelpIcon from "@mui/icons-material/Help"
import EqualizerIcon from "@mui/icons-material/Equalizer"
import { AppContext } from "../AppProvider"

const Nav = () => {
  const { handleVisible } = useContext(AppContext)
  return (
    <div className="nav">
      <div className="help">
        <HelpIcon />
      </div>
      <div className="wordle-container">
        <h1 className="wordle">wordle</h1>
      </div>
      <div className="equalizer" onClick={() => handleVisible(true)}>
        <EqualizerIcon />
      </div>
    </div>
  )
}
export default Nav
