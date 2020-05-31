import React, { useState } from 'react';
import { NumberDisplay } from './NumberDisplay'
import { generateCells } from '../utils'
import { Button } from './Button'

export const App: React.FC = () => {
  //dont forget you can initialize useState with a called funciton 😁
  const [cells, setCells ] = useState(generateCells())

  return (
    <div className="App">
      <div className="Header">
      <NumberDisplay value={0} />
      <div className="Face">
        <span
          role="img"
          aria-label="Smiley emoji"
        >😁</span>
      </div>
      <NumberDisplay value={23} />
      </div>
      <div className="Body">
        {cells.map((row, rowIndex) => 
          row.map((cell, colIndex) => 
            <Button key={`${rowIndex} ${colIndex}`}/>
          )
        )}
      </div>
    </div>
  )
}