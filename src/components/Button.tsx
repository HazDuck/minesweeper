import React from 'react';
import { Cell, CellState, CellValue } from '../types'

interface ButtonProps {
  row: number, 
  col: number,
  state: CellState,
  value: CellValue
}

export const Button: React.FC <ButtonProps> = ({ row, col, state, value }) => (
  <div className="Button"></div>
)

