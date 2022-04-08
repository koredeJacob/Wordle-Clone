import React, { createContext, useEffect, useState } from "react"
import { wordbank } from "./words"
import { defaultboard } from "./defaultboard"
import { keyone, keytwo, keythree } from "./defaultkeys"

const loadJSON = (key) => key && JSON.parse(localStorage.getItem(key))
export const AppContext = createContext()
const wordset = new Set(wordbank)

const AppProvider = ({ children }) => {
  localStorage.clear()
  const [Word, setWord] = useState(localStorage.getItem("word"))
  const [Board, setBoard] = useState(loadJSON("board"))
  const [Index, setIndex] = useState({ row: 0, column: -1 })
  const [Invalidword, setInvalidword] = useState(false)
  const [Gameover, setGameover] = useState(false)
  const [Playagain, setPlayagain] = useState(false)
  const [Result, setResult] = useState(false)
  const [Key1, setKey1] = useState(keyone)
  const [Key2, setKey2] = useState(keytwo)
  const [Key3, setKey3] = useState(keythree)

  let { row, column } = Index

  const clickedletter = (letter) => {
    if (!Gameover) {
      if (row <= 5 && column < 4) {
        Board[row][column + 1].letter = letter
        setIndex({ row, column: column + 1 })
        localStorage.setItem("board", JSON.stringify(Board))
        setBoard(JSON.parse(localStorage.getItem("board")))
      }
    }
  }

  const handleEnter = async () => {
    if (!Gameover) {
      if (row < 6 && column < 4) {
        setInvalidword(true)
        setTimeout(() => setInvalidword(false), 1500)
      } else if (row <= 5 && column === 4) {
        let guess = ""
        for (let i = 0; i <= 4; i++) {
          guess += Board[row][i].letter.toLowerCase()
        }
        if (wordset.has(guess)) {
          await checkGuess(Board[row])
          colorkeys(guess)
          setKey1(Key1)
          setKey2(Key2)
          setKey3(Key3)
          endGame(guess)
          setIndex({ row: row + 1, column: -1 })
        } else {
          setInvalidword(true)
          setTimeout(() => setInvalidword(false), 1500)
        }
      }
    }
  }

  const handleDel = () => {
    if (!Gameover) {
      if (row <= 5 && column >= 0) {
        Board[row][column].letter = ""
        setIndex({ row, column: column - 1 })
        localStorage.setItem("board", JSON.stringify(Board))
        setBoard(JSON.parse(localStorage.getItem("board")))
      }
    }
  }

  const checkGuess = (arr) =>
    new Promise((resolve) => {
      validGuess(arr)
      setTimeout(resolve, 2500)
    })

  const validGuess = (arr) => {
    let time = 0
    arr.forEach((element, index) => {
      setTimeout(() => color(element, index), (time += 500))
    })
  }

  const color = (element, index) => {
    const character = element.letter.toLowerCase()
    if (character === Word[index]) {
      element.color = "green"
    } else if (character !== Word[index] && Word.includes(character)) {
      element.color = "yellow"
    } else {
      element.color = "grey"
    }
    localStorage.setItem("board", JSON.stringify(Board))
    setBoard(JSON.parse(localStorage.getItem("board")))
  }

  const endGame = (guess) => {
    if (guess === Word || row >= 5) {
      if (guess === Word) {
        setResult(true)
      }
      setPlayagain(true)
      setGameover(true)
    }
  }
  const colorkeys = (guess) => {
    for (let i = 0; i < guess.length; i++) {
      const uppercase = guess[i].toUpperCase()
      if (guess[i] === Word[i] || Word.includes(guess[i])) {
        let found = false
        const correctindex = guess[i] === Word[i]
        for (let j = 0; j < Key1.length; j++) {
          if (Key1[j].letter === uppercase) {
            if (Key1[j].color !== "green") {
              Key1[j].color = correctindex ? "green" : "yellow"
            }
            found = true
            break
          }
          if (!found) {
            for (let j = 0; j < Key2.length; j++) {
              if (Key2[j].letter === uppercase) {
                if (Key2[j].color !== "green") {
                  Key2[j].color = correctindex ? "green" : "yellow"
                }
                found = true
                break
              }
            }
          }
          if (!found) {
            for (let j = 0; j < Key3.length; j++) {
              if (Key3[j].letter === uppercase) {
                if (Key3[j].color !== "green") {
                  Key3[j].color = correctindex ? "green" : "yellow"
                }
                break
              }
            }
          }
        }
      } else {
        let found = false
        for (let j = 0; j < Key1.length; j++) {
          if (Key1[j].letter === uppercase) {
            Key1[j].color = "grey"
            found = true
            break
          }
        }
        if (!found) {
          for (let j = 0; j < Key2.length; j++) {
            if (Key2[j].letter === uppercase) {
              Key2[j].color = "grey"
              found = true
              break
            }
          }
        }
        if (!found) {
          for (let j = 0; j < Key3.length; j++) {
            if (Key3[j].letter === uppercase) {
              Key3[j].color = "grey"
              break
            }
          }
        }
      }
    }
  }

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
    <AppContext.Provider
      value={{
        Word,
        Board,
        Key1,
        Key2,
        Key3,
        Invalidword,
        Playagain,
        Result,
        clickedletter,
        handleEnter,
        handleDel
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
