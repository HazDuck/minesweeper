import React, { useState, useEffect } from 'react';
import { NumberDisplay } from './NumberDisplay'
import { generateCells, openMultipleCells } from '../utils'
import { Button } from './Button'
import { Face, Cell, CellValue, CellState } from '../types'
import { CONSTANTS } from '../constants'

export const App: React.FC = () => {
  //dont forget you can initialize useState with a called funciton 😁
  const [cells, setCells] = useState<Cell[][]>(generateCells())
  const [face, setFace] = useState<Face>(Face.smile)
  const [time, setTime] = useState<number>(0)
  const [live, setLive] = useState<boolean>(false)
  const [flags, setFlags] = useState<number>(CONSTANTS.NO_OF_BOMBS)
  const [hasLost, setHasLost] = useState<boolean>(false)

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
  }, [])

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
    return () => {
    }
  }, [hasLost])

  const handleCellClick = (rowIndex: number, colIndex: number) => (): void => {
    //start game
    if(!live) {
      //TODO: make sure first click cant be a bomb
      setLive(true)
    }
    let newCells = cells.slice()
    const currentCell = cells[rowIndex][colIndex]

    if (currentCell.state === CellState.flagged || currentCell.state === CellState.visible) {
      return
    }

    if (currentCell.value === CellValue.bomb) {
      setHasLost(true)
      showAllBombs()
      
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowIndex, colIndex)
      setCells(newCells)
    } else {
      newCells[rowIndex][colIndex].state = CellState.visible
      setCells(newCells)
    }
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
            if (live) {
              setLive(false)
              setTime(0)
              setCells(generateCells())
              setHasLost(false)
            }
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