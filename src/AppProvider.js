import React, { createContext, useCallback, useEffect, useState } from "react"
import { wordbank } from "./words"
import { defaultboard } from "./defaultboard"
import { keyone, keytwo, keythree } from "./defaultkeys"
import { elementAcceptingRef } from "@mui/utils"

const loadJSON = (key) => key && JSON.parse(localStorage.getItem(key))
export const AppContext = createContext()
const wordset = new Set(wordbank)

const AppProvider = ({ children }) => {
  const [Word, setWord] = useState(localStorage.getItem("word"))
  const [Board, setBoard] = useState(loadJSON("board"))
  const [Index, setIndex] = useState(loadJSON("index"))
  const [Invalidword, setInvalidword] = useState(false)
  const [Gameover, setGameover] = useState(false)
  const [Playagain, setPlayagain] = useState(false)
  const [Result, setResult] = useState(false)
  const [Key1, setKey1] = useState(loadJSON("keyone"))
  const [Key2, setKey2] = useState(loadJSON("keytwo"))
  const [Key3, setKey3] = useState(loadJSON("keythree"))
  let row, column
  if (Index) ({ row, column } = Index)
  console.log(row)
  const clickedletter = (letter) => {
    if (!Gameover) {
      if (row <= 5 && column < 4) {
        Board[row][column + 1].letter = letter
        setIndex({ row, column: column + 1 })
        setBoard(Board)
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
          endGame(guess)
          localStorage.setItem("index", JSON.stringify({ row: row + 1, column: -1 }))
          setIndex(JSON.parse(localStorage.getItem("index")))
          localStorage.setItem("board", JSON.stringify(Board))
          setBoard(JSON.parse(localStorage.getItem("board")))
          localStorage.setItem("keyone", JSON.stringify(Key1))
          localStorage.setItem("keytwo", JSON.stringify(Key2))
          localStorage.setItem("keythree", JSON.stringify(Key3))
          setKey1(JSON.parse(localStorage.getItem("keyone")))
          setKey2(JSON.parse(localStorage.getItem("keytwo")))
          setKey3(JSON.parse(localStorage.getItem("keythree")))
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
        setBoard(Board)
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

  const newGame = () => {
    keyone.forEach((val) => (val.color = "#d8d8d8"))
    keytwo.forEach((val) => (val.color = "#d8d8d8"))
    keythree.forEach((val) => (val.color = "#d8d8d8"))
    setBoard(null)
    setWord(null)
    setIndex(null)
    setKey1(null)
    setKey2(null)
    setKey3(null)
    setGameover(false)
    setPlayagain(false)
  }

  const handlekeypress = useCallback((e) => {
    if (e.key === "Enter") handleEnter()
    else if (e.key === "Backspace") handleDel()
    else if (e.key >= "a" && e.key <= "z") clickedletter(e.key.toUpperCase())
  })

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
  }, [Word])

  useEffect(() => {
    if (Board) return
    localStorage.setItem("board", JSON.stringify(defaultboard))
    setBoard(JSON.parse(localStorage.getItem("board")))
  }, [Board])

  useEffect(() => {
    if (Index) return
    localStorage.setItem("index", JSON.stringify({ row: 0, column: -1 }))
    setIndex(JSON.parse(localStorage.getItem("index")))
  }, [Index])

  useEffect(() => {
    if (Key1 && Key2 && Key3) return
    localStorage.setItem("keyone", JSON.stringify(keyone))
    localStorage.setItem("keytwo", JSON.stringify(keytwo))
    localStorage.setItem("keythree", JSON.stringify(keythree))
    setKey1(JSON.parse(localStorage.getItem("keyone")))
    setKey2(JSON.parse(localStorage.getItem("keytwo")))
    setKey3(JSON.parse(localStorage.getItem("keythree")))
  }, [Key1, Key2, Key3])

  useEffect(() => {
    if (row) {
      console.log("beak")
      if (row > 0 && row <= 6) {
        let check = ""
        Board[row - 1].forEach((val) => (check += val.letter.toLowerCase()))
        if (check === Word) {
          newGame()
        } else if (row === 6 && check !== Word) {
          newGame()
        }
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keyup", handlekeypress)
    return () => window.removeEventListener("keyup", handlekeypress)
  }, [handlekeypress])
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
        handleDel,
        newGame
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
