import React from "react"
import { render } from "react-dom"
import AppProvider from "./AppProvider"
import App from "./App"
import "./index.css"

render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
)
