export const boardRows = 6;
export const boardColumns = 7;
export const winCondition = 4;

export function meetsWinCondition(direction, row, column, board) {
  const pawn = board[row][column]
  switch (direction) {
    case "horizontal":
      return countConsecutivePawns(board, row, column, "right", pawn, 0) +
        countConsecutivePawns(board, row, column, "left", pawn, 0) + 1 === winCondition;
    case "vertical":
      return countConsecutivePawns(board, row, column, "vertical", pawn, 0) + 1 === winCondition;
    case "downdiagonal":
      return countConsecutivePawns(board, row, column, "downdiagonalleft", pawn, 0) +
        countConsecutivePawns(board, row, column, "downdiagonalright", pawn, 0) + 1 === winCondition;
    case "updiagonal":
      return countConsecutivePawns(board, row, column, "updiagonalleft", pawn, 0) +
        countConsecutivePawns(board, row, column, "updiagonalright", pawn, 0) + 1 === winCondition;
    default:
      throw new IllegalArgumentException("Unknown direction: '" + direction + "'");
  }
}

function countConsecutivePawns(board, row, column, direction, color, pawns) {
  const nextRow = getNextRow(row, direction);
  const nextColumn = getNextColumn(column, direction);
  if (
    isOutsideBoard(nextRow, boardRows) ||
    isOutsideBoard(nextColumn, boardColumns) ||
    board[nextRow][nextColumn] !== color
  ) {
    return pawns;
  }
  return countConsecutivePawns(board, nextRow, nextColumn, direction, color, pawns + 1);
}

function isOutsideBoard(index, max) {
  return index < 0 || index >= max;
}

function getNextRow(row, direction) {
  switch (direction) {
    case "left":
    case "right":
      return row;
    case "vertical":
    case "downdiagonalright":
    case "updiagonalleft":
      return row + 1;
    case "downdiagonalleft":
    case "updiagonalright":
      return row - 1;
    default:
      throw new IllegalArgumentException(
        "Unknown direction: '" + direction + "'"
      );
  }
}

function getNextColumn(column, direction) {
  switch (direction) {
    case "vertical":
      return column;
    case "left":
    case "downdiagonalleft":
    case "updiagonalleft":
      return column - 1;
    case "right":
    case "downdiagonalright":
    case "updiagonalright":
      return column + 1;
    default:
      throw new IllegalArgumentException(
        "Unknown direction: '" + direction + "'"
      );
  }
}

function IllegalArgumentException(message) {
  this.message = message;
  this.name = "IllegalArgumentException";
}
