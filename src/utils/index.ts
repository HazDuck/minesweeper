import { CONSTANTS } from "../constants";
import { CellValue, CellState, Cell } from "../types";

const grabAllAdjacentCells = (
  cells: Cell[][], 
  row: number, 
  col: number
  ): {
    topLeftBomb: Cell | null,
    topBomb: Cell | null,
    topRightBomb: Cell | null,
    leftBomb: Cell | null,
    rightBomb: Cell | null,
    bottomLeftBomb: Cell | null,
    bottomBomb: Cell | null,
    bottomRightBomb: Cell | null
} => {
  //TODO: rename all of these to topLeftCell etc
  const topLeftBomb =
  row > 0 && col > 0
    ? cells[row - 1][col - 1]
    : null;
const topBomb = row > 0 ? cells[row - 1][col] : null;
const topRightBomb =
row > 0 && col < CONSTANTS.MAX_COLS - 1
    ? cells[row - 1][col + 1]
    : null;
const leftBomb = col > 0 ? cells[row][col - 1] : null;
const rightBomb =
col < CONSTANTS.MAX_COLS - 1
    ? cells[row][col + 1]
    : null;
const bottomLeftBomb =
row < CONSTANTS.MAX_ROWS - 1 && col > 0
    ? cells[row + 1][col - 1]
    : null;
const bottomBomb =
row < CONSTANTS.MAX_ROWS - 1
    ? cells[row + 1][col]
    : null;
const bottomRightBomb =
row < CONSTANTS.MAX_ROWS - 1 && col < CONSTANTS.MAX_COLS - 1
    ? cells[row + 1][col + 1]
    : null;

    return {
      topLeftBomb,
      topBomb,
      topRightBomb,
      leftBomb,
      rightBomb,
      bottomLeftBomb,
      bottomBomb,
      bottomRightBomb
    }
}

export const generateCells = (): Cell[][] => {
  //an array of different Cells, wrapped in an array
  let cells: Cell[][] = [];

  //generate all cells
  for (let row = 0; row < CONSTANTS.MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < CONSTANTS.MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.initial
      });
    }
  }

  //randomly add bombs
  let bombsPlaced = 0;
  while (bombsPlaced < CONSTANTS.NO_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * CONSTANTS.MAX_ROWS);
    const randomCol = Math.floor(Math.random() * CONSTANTS.MAX_COLS);
    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.bomb) {
      //he maps over all the cells and checks here i dont
      cells[randomRow][randomCol] = {
        ...cells[randomRow][randomCol],
        value: CellValue.bomb
      };
      bombsPlaced++;
    }
  }

    //calculate the numbers for each cell
    for (let rowIndex = 0; rowIndex < CONSTANTS.MAX_ROWS; rowIndex++) {
      for (let colIndex = 0; colIndex < CONSTANTS.MAX_COLS; colIndex++) {
        const currentCell = cells[rowIndex][colIndex];
        if (currentCell.value === CellValue.bomb) {
          continue;
        }

        let numberOfBombs = 0;
        const { 
          topLeftBomb,
          topBomb,
          topRightBomb,
          leftBomb,
          rightBomb,
          bottomLeftBomb,
          bottomBomb,
          bottomRightBomb
        } = grabAllAdjacentCells(cells, rowIndex, colIndex)
        

        //apparently can use topLeftBomb?.value but im getting an error
        if (topLeftBomb && topLeftBomb.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (topBomb && topBomb.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (topRightBomb && topRightBomb.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (leftBomb && leftBomb.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (rightBomb && rightBomb.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (bottomLeftBomb && bottomLeftBomb.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (bottomBomb && bottomBomb.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (bottomRightBomb && bottomRightBomb.value === CellValue.bomb) {
          numberOfBombs++;
        }

        if (numberOfBombs > 0) {
          cells[rowIndex][colIndex] = {
            ...currentCell,
            value: numberOfBombs
          };
        }
      }
    }

  return cells;
};

export const openMultipleCells = (cells: Cell[][], rowIndex: number, colIndex: number): Cell[][] => {
  
  let newCells = cells.slice()
  const currentCell = cells[rowIndex][colIndex]

  newCells[rowIndex][colIndex].state = CellState.visible

  const { 
    topLeftBomb,
    topBomb,
    topRightBomb,
    leftBomb,
    rightBomb,
    bottomLeftBomb,
    bottomBomb,
    bottomRightBomb
  } = grabAllAdjacentCells(cells, rowIndex, colIndex)

  if (topLeftBomb && topLeftBomb.state === CellState.visible && topLeftBomb.value !== CellValue.bomb) {
    
  }
}
