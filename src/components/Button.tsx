import React from 'react';
import { CellState, CellValue } from '../types'

interface ButtonProps {
  row: number,
  col: number,
  state: CellState,
  value: CellValue,
  red?: boolean
  onClick(rowParam: number, colParam: number): 
  //generic void function that takes in any amount of parameters and returns a void
  (...args: any[]) => void
  onContext(rowParam: number, colParam: number): (...args: any[]) => void
}

export const Button: React.FC<ButtonProps> = ({ row, col, state, value, red, onClick, onContext }) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <span role="img" aria-label="Bomb">💣</span>
      }
      if (value === CellValue.none) {
        return null
      }
      return value
    } else if (state === CellState.flagged) {
      return <span role="img" aria-label="Flag">🚩</span>
    } else {
      return null
    }
  }
  return (
    <div 
      className={`Button ${state === CellState.visible ? 'visible' : ''} value-${value} ${red ? 'red' : undefined}`}
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
      >
        {renderContent()}
    </div>
  )
}

