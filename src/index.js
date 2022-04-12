import React from "react"
import { render } from "react-dom"
import AppProvider from "./AppProvider"
import App from "./App"

render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
