import { CONSTANTS } from "../constants";
import { CellValue, CellState, Cell } from "../types";

export const generateCells = (): Cell[][] => {
  //an array of different Cells, wrapped in an array
  let cells: Cell[][] = [];

  //generate all cells
  for (let row = 0; row < CONSTANTS.MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < CONSTANTS.MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.visible //TODO: switch back to Cellstate.initial
      });
    }
  }

  //randomly add bombs
  let bombsPlaced = 0;
  while (bombsPlaced <= CONSTANTS.NO_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * CONSTANTS.MAX_ROWS);
    const randomCol = Math.floor(Math.random() * CONSTANTS.MAX_COLS);
    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.bomb) {
      cells[randomRow][randomCol] = {
        ...cells[randomRow][randomCol],
        value: CellValue.bomb
      };
    }
    bombsPlaced++;
  }
  //calculate the numbers for each cell
  
  for (let rowIndex = 0; rowIndex < CONSTANTS.MAX_ROWS; rowIndex++ ) {
    for (let colIndex = 0; colIndex < CONSTANTS.MAX_COLS; colIndex++) {
      
    }
  }

  return cells;
};

