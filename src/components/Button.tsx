import React from 'react';
import { CellState, CellValue } from '../types'

interface ButtonProps {
  row: number,
  col: number,
  state: CellState,
  value: CellValue
}

export const Button: React.FC<ButtonProps> = ({ row, col, state, value }) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <span role="img" aria-label="Bomb">💣</span>
      } else {
        return value
      }
    } else if (state === CellState.flagged) {
      return <span role="img" aria-label="Flag">🚩</span>
    } else {
      return null
    }
  }
  return (
    <div className={`Button ${state === CellState.visible ? 'visible' : ''}`}>
      {renderContent()}
    </div>
  )
}

