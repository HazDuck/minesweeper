import { CONSTANTS } from '../constants'
import { CellValue, CellState, Cell } from '../types'

export const generateCells = (): Cell[][] => {
  //an array of different Cells, wrapped in an array
  const cells: Cell[][] = []

  for (let row = 0; row < CONSTANTS.MAX_ROWS; row++) {
    cells.push([])
    for (let col = 0; col < CONSTANTS.MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.initial
      })
    }
  }
  return cells
}