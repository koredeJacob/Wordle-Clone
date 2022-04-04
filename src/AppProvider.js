import React, { createContext, useEffect, useState } from "react"
import { wordbank } from "./words"
import { defaultboard } from "./defaultboard"
import { keyone, keytwo, keythree } from "./defaultkeys"

const loadJSON = (key) => key && JSON.parse(localStorage.getItem(key))
export const AppContext = createContext()
const AppProvider = ({ children }) => {
  const [Word, setWord] = useState(localStorage.getItem("word"))
  const [Board, setBoard] = useState(loadJSON("board"))
  const [Key1, setKey1] = useState(keyone)
  const [Key2, setKey2] = useState(keytwo)
  const [Key3, setKey3] = useState(keythree)

  const randomnum = Math.floor(Math.random() * wordbank.length)
  console.log(Word, Board)
  useEffect(() => {
    if (Word) return
    localStorage.setItem("word", wordbank[randomnum])
    setWord(localStorage.getItem("word"))
  }, [])

  useEffect(() => {
    if (Board) return
    localStorage.setItem("board", JSON.stringify(defaultboard))
    setBoard(JSON.parse(localStorage.getItem("board")))
  }, [])

  return (
    <AppContext.Provider value={{ Word, Board, Key1, Key2, Key3 }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
