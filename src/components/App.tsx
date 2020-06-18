import React, { useState, useEffect } from 'react';
import { NumberDisplay } from './NumberDisplay'
import { generateCells } from '../utils'
import { Button } from './Button'
import { Face, Cell, CellValue, CellState } from '../types'
import { bool } from 'prop-types';
import { CONSTANTS } from '../constants'

export const App: React.FC = () => {
  //dont forget you can initialize useState with a called funciton 😁
  const [cells, setCells] = useState<Cell[][]>(generateCells())
  const [face, setFace] = useState<Face>(Face.smile)
  const [time, setTime] = useState<number>(0)
  const [live, setLive] = useState<boolean>(false)
  const [flags, setFlags] = useState<number>(CONSTANTS.NO_OF_BOMBS)

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
              onClick={(rowParam, colParam) => (): void => {
                //start game
                if(!live) {
                  setLive(true)
                }
              }}
            />
          )
        )}
      </div>
    </div>
  )
}