import React, { useState, useEffect } from 'react';
import { NumberDisplay } from './NumberDisplay'
import { generateCells } from '../utils'
import { Button } from './Button'
import { Face } from '../types'

export const App: React.FC = () => {
  //dont forget you can initialize useState with a called funciton 😁
  const [cells, setCells] = useState(generateCells())
  const [face, setFace] = useState(Face.smile)

  useEffect(() => {
    window.addEventListener('mousedown', () => {
      setFace(Face.oh)
    })
    window.addEventListener('mouseup', () => {
      setFace(Face.smile)
    })
  }, [])

  return (
    <div className="App">
      <div className="Header">
      <NumberDisplay value={0} />
      <div className="Face">
        <span
          role="img"
          aria-label="Smiley emoji"
        >{face}</span>
      </div>
      <NumberDisplay value={23} />
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
            />
          )
        )}
      </div>
    </div>
  )
}