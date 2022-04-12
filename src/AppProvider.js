import React, { createContext, useEffect, useState } from "react"
import { wordbank } from "./words"
import { defaultboard } from "./defaultboard"
import { keyone, keytwo, keythree } from "./defaultkeys"

const loadJSON = (key) => key && JSON.parse(localStorage.getItem(key))

const setJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const AppContext = createContext()
const wordset = new Set(wordbank)

/*Approvider sets and modifies the apps state. state is passed to child
  components through the context api,local storage is used to store game data 
  so statistics and game state remain consistent through rerenders
 */
const AppProvider = ({ children }) => {
  const [Word, setWord] = useState(localStorage.getItem("word"))
  const [Board, setBoard] = useState(loadJSON("board"))
  const [Index, setIndex] = useState(loadJSON("index"))
  const [Invalidword, setInvalidword] = useState(false)
  const [Gameover, setGameover] = useState(false)
  const [Playagain, setPlayagain] = useState(false)
  const [Result, setResult] = useState(false)
  const [Visible, setVisible] = useState(false)
  const [Key1, setKey1] = useState(loadJSON("keyone"))
  const [Key2, setKey2] = useState(loadJSON("keytwo"))
  const [Key3, setKey3] = useState(loadJSON("keythree"))
  const [Played, setPlayed] = useState(loadJSON("played"))
  const [Winpercent, setWinpercent] = useState(loadJSON("winpercent"))
  const [Wins, setWins] = useState(loadJSON("wins"))
  const [Current, setCurrent] = useState(loadJSON("current"))
  const [Maxstreak, setMaxstreak] = useState(loadJSON("maxstreak"))
  const [Guess, setGuess] = useState(loadJSON("guess"))
  const [Howtoplay, setHowtoplay] = useState(false)

  let row, column
  if (Index) ({ row, column } = Index)
  console.log(row)

  //function to toggle statistics visiblity
  const handleVisible = (val) => {
    setVisible(val)
  }

  //function to toggle the visibility of game instructions
  const showHelp = (val) => {
    setHowtoplay(val)
  }

  /*function to process keyboard letter events 
  updates letter property in board array with clicked letter*/
  const clickedletter = (letter) => {
    if (!Gameover && !Visible && !Howtoplay) {
      if (row <= 5 && column < 4) {
        Board[row][column + 1].letter = letter
        setIndex({ row, column: column + 1 })
        setBoard(Board)
      }
    }
  }

  /* function handles enter event,checks if a valid word is guessed
  by calling checkguess function. if guess is valid it changes state appropriately 
  else it sets invalid word to true*/
  const handleEnter = async () => {
    if (!Gameover && !Visible && !Howtoplay) {
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
          setJSON("index", { row: row + 1, column: -1 })
          setJSON("keyone", Key1)
          setJSON("keytwo", Key2)
          setJSON("keythree", Key3)
          setJSON("board", Board)
          setBoard(loadJSON("board"))
          setIndex(loadJSON("index"))
          setKey1(loadJSON("keyone"))
          setKey2(loadJSON("keytwo"))
          setKey3(loadJSON("keythree"))
        } else {
          setInvalidword(true)
          setTimeout(() => setInvalidword(false), 1500)
        }
      }
    }
  }

  //handles deletion of letters
  const handleDel = () => {
    if (!Gameover && !Visible && !Howtoplay) {
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
      setTimeout(resolve, 1500)
    })

  const validGuess = (arr) => {
    let time = 0
    arr.forEach((element, index) => {
      setTimeout(() => color(element, index), (time += 300))
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
    setJSON("board", Board)
    setBoard(loadJSON("board"))
  }

  //checks if user guessed the correct word
  const endGame = (guess) => {
    if (guess === Word || row >= 5) {
      let newwin = Wins
      if (guess === Word) {
        setResult(true)
        Guess[row] += 1
        newwin = Wins + 1
        setJSON("guess", Guess)
        setGuess(loadJSON("guess"))
        setJSON("wins", Wins + 1)
        setWins(loadJSON("wins"))
        localStorage.setItem("current", JSON.stringify(Current + 1))
        setCurrent(loadJSON("current"))

        if (loadJSON("current") > Maxstreak) {
          setJSON("maxstreak", loadJSON("current"))
          setMaxstreak(loadJSON("maxstreak"))
        }
      } else if (row >= 5) {
        setJSON("current", 0)
        setCurrent(loadJSON("current"))
      }

      let newplayed = Played + 1
      setPlayagain(true)
      setGameover(true)
      setJSON("played", Played + 1)
      setPlayed(loadJSON("played"))
      setJSON("winpercent", ((newwin / newplayed) * 100).toFixed(0))
      setWinpercent(loadJSON("winpercent"))
    }
  }

  //resets the app for a new game
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

  const handlekeypress = (e) => {
    if (e.key === "Enter") handleEnter()
    else if (e.key === "Backspace") handleDel()
    else if (e.key >= "a" && e.key <= "z") clickedletter(e.key.toUpperCase())
  }

  /*function colors the keys appropriately by modifying the board and keys
  array*/
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
    setJSON("board", defaultboard)
    setBoard(loadJSON("board"))
  }, [Board])

  useEffect(() => {
    if (Index) return
    setJSON("index", { row: 0, column: -1 })
    setIndex(loadJSON("index"))
  }, [Index])

  useEffect(() => {
    if (Key1 && Key2 && Key3) return
    setJSON("keyone", keyone)
    setJSON("keytwo", keytwo)
    setJSON("keythree", keythree)
    setKey1(loadJSON("keyone"))
    setKey2(loadJSON("keytwo"))
    setKey3(loadJSON("keythree"))
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

  useEffect(() => {
    if (Played) return
    setJSON("played", 0)
    setJSON("current", 0)
    setJSON("wins", 0)
    setJSON("winpercentage", 0)
    setJSON("maxstreak", 0)
    setJSON("guess", [0, 0, 0, 0, 0, 0])
    setGuess(loadJSON("guess"))
    setPlayed(loadJSON("played"))
    setWinpercent(loadJSON("winpercentage"))
    setWinpercent(loadJSON("wins"))
    setCurrent(loadJSON("current"))
    setMaxstreak(loadJSON("maxstreak"))
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
        Winpercent,
        Visible,
        Howtoplay,
        Current,
        Maxstreak,
        Played,
        Guess,
        handleVisible,
        clickedletter,
        handleEnter,
        handleDel,
        newGame,
        handleVisible,
        showHelp
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
