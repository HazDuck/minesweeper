import React, { useState, useEffect } from 'react';
import { NumberDisplay } from './NumberDisplay'
import { generateCells, openMultipleCells } from '../utils'
import { Button } from './Button'
import { Face, Cell, CellValue, CellState } from '../types'
import { CONSTANTS } from '../constants'
import { red } from 'color-name';
import { bool } from 'prop-types';

export const App: React.FC = () => {
  //dont forget you can initialize useState with a called funciton 😁
  const [cells, setCells] = useState<Cell[][]>(generateCells())
  const [face, setFace] = useState<Face>(Face.smile)
  const [time, setTime] = useState<number>(0)
  const [live, setLive] = useState<boolean>(false)
  const [flags, setFlags] = useState<number>(CONSTANTS.NO_OF_BOMBS)
  const [hasLost, setHasLost] = useState<boolean>(false)
  const [hasWon, setHasWon] = useState<boolean>(false)

  console.log(hasWon)
  
  useEffect(() => {
    window.addEventListener('mousedown', (): void => {
      setFace(Face.oh)
    })
    window.addEventListener('mouseup', (): void => {
      setFace(Face.smile)
    })
    
    return () => {
      window.removeEventListener('mousedown', (): void => {
        setFace(Face.oh)
      })
      window.removeEventListener('mouseup', (): void => {
        setFace(Face.smile)
      })
    }
  })

  //remember: if live changes ie in the dependencies and live it true you get into this useeffect
  useEffect(() => {
    if (live && time < 999) {
      const interval = setInterval(() => {
        setTime(time + 1)
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [live, time]) 

  useEffect(() => {
    if (hasLost) {
      setLive(false)
      setFace(Face.lost)
    }
  }, [hasLost])

  useEffect(() => {
    if (hasWon) {
      setFace(Face.win)
      setLive(false)
    }
  }, [hasWon])

  const handleCellClick = (rowIndex: number, colIndex: number) => (): void => {
    //start game
    if(!live && !hasWon) {
      //TODO: make sure first click cant be a bomb
      console.log('here')
      setLive(true)
    }

    let newCells = cells.slice()
    const currentCell = cells[rowIndex][colIndex]

    if (currentCell.state === CellState.flagged || currentCell.state === CellState.visible) {
      return
    }

    //handle different behaviours based on cell value
    if (currentCell.value === CellValue.bomb) {
      newCells[rowIndex][colIndex].red = true
      setHasLost(true)
      newCells = showAllBombs()
      setCells(newCells)
      return 
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowIndex, colIndex)
      setCells(newCells)
    } else {
      newCells[rowIndex][colIndex].state = CellState.visible
    }

    //check to see if we have a winenr 
    let safeOpenCellsExist = false
    for (let row = 0; row < CONSTANTS.MAX_ROWS; row++) {
      for (let col = 0; col < CONSTANTS.MAX_COLS; col++) {
        if (newCells[row][col].state === CellState.initial && newCells[row][col].value !== CellValue.bomb) {
          safeOpenCellsExist = true
          break
        }
      }
    }

    if (!safeOpenCellsExist) {
      newCells = newCells.map(row => 
        row.map(cell => {
        if (cell.value === CellValue.bomb) {
          cell.state = CellState.flagged
        }
        return cell
      }))
      setHasWon(true)
    }

    setCells(newCells)
  }

  const showAllBombs = (): Cell[][] => {
    const currentCells = cells.slice()
    return currentCells.map(row => 
      row.map(cell => {
        if (cell.value === CellValue.bomb) {
          cell.state = CellState.visible
          return cell
        }
        return cell
      })
    )
  }

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={flags} />
        <div 
          className="Face"
          onClick={(): void => {
            setLive(false)
            setTime(0)
            setCells(generateCells())
            setHasLost(false)
            setHasWon(false)
            setFlags(10)
          }}
          >
          <span
            role="img"
            aria-label="Smiley emoji"
          >{face}</span>
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">
        {cells.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            <Button
              key={`${rowIndex} ${colIndex}`}
              row={rowIndex}
              col={colIndex}
              state={cell.state}
              value={cell.value}
              red={cell.red}
              //handles right click
              onContext={(rowParam, colParam) => (e) => {
                e.preventDefault()
                if (cell.state === CellState.visible || !live) {
                  return
                } 
                else if (cell.state === CellState.initial) {
                  cell.state = CellState.flagged
                  setFlags(flags - 1)
                }
                else if (cell.state === CellState.flagged) {
                  cell.state = CellState.initial
                  setFlags(flags + 1)
                }
              }}
              //function that returns a function
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          )
        )}
      </div>
    </div>
  )
}