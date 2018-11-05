import React, { Component } from "react";
import Board, { BoardOutOfBoundsException } from "./Board";
import "./App.css";

const boardRows = 6;
const boardColumns = 7;
const winCondition = 4;

class App extends Component {
  constructor(props) {
    super(props);
    // let pawns = Array(props.rows);
    // for (let i = 0; i < pawns.length; i++) {
    //     let column = Array(this.props.columns);
    //     pawns[i] = column.fill(0);
    // }
    this.state = this.initState();
    this.endGame = this.endGame.bind(this);
    this.newGame = this.newGame.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.fillColumn = this.fillColumn.bind(this);
    this.countConsecutivePawns = this.countConsecutivePawns.bind(this);
  }

  initState() {
    return {
      currentPlayer: 1,
      inGame: true,
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    };
  }

  handleMove(column) {
    if (!this.state.inGame) {
      return;
    }
    let row = this.fillColumn(column, this.state.board.length - 1);
    if (this.endGame(row, column)) {
      this.setState({ inGame: false });
    } else {
      this.setState({
        currentPlayer: this.state.currentPlayer === 1 ? 2 : 1
      });
    }
  }

  fillColumn(column, row) {
    if (row < 0) {
      throw new BoardOutOfBoundsException(
        "Row must be a value between 0 and " + this.state.rows
      );
    }
    if (this.state.board[row][column] !== 0) {
      return this.fillColumn(column, row - 1);
    }
    let board = this.state.board;
    board[row][column] = this.state.currentPlayer;
    this.setState({ board: board });
    return row;
  }

  endGame(row, column) {
    let pawn = this.state.board[row][column];
    return (
      this.countConsecutivePawns(
        this.getNextRow(row, "right"),
        this.getNextColumn(column, "right"),
        "right",
        pawn,
        0
      ) +
        this.countConsecutivePawns(
          this.getNextRow(row, "left"),
          this.getNextColumn(column, "left"),
          "left",
          pawn,
          0
        ) +
        1 ===
        winCondition ||
      this.countConsecutivePawns(
        this.getNextRow(row, "vertical"),
        this.getNextColumn(column, "vertical"),
        "vertical",
        pawn,
        0
      ) +
        1 ===
        winCondition ||
      this.countConsecutivePawns(
        this.getNextRow(row, "downdiagonalleft"),
        this.getNextColumn(column, "downdiagonalleft"),
        "downdiagonalleft",
        pawn,
        0
      ) +
        this.countConsecutivePawns(
          this.getNextRow(row, "downdiagonalright"),
          this.getNextColumn(column, "downdiagonalright"),
          "downdiagonalright",
          pawn,
          0
        ) +
        1 ===
        winCondition ||
      this.countConsecutivePawns(
        this.getNextRow(row, "updiagonalleft"),
        this.getNextColumn(column, "updiagonalleft"),
        "updiagonalleft",
        pawn,
        0
      ) +
        this.countConsecutivePawns(
          this.getNextRow(row, "updiagonalright"),
          this.getNextColumn(column, "updiagonalright"),
          "updiagonalright",
          pawn,
          0
        ) +
        1 ===
        winCondition
    );
  }

  countConsecutivePawns(row, column, direction, color, pawns) {
    if (
      this.rowIsOutsideBoard(row, this.state.board) ||
      this.columnIsOutsideBoard(column, this.state.board[row]) ||
      this.state.board[row][column] !== color
    ) {
      return pawns;
    }
    return this.countConsecutivePawns(
      this.getNextRow(row, direction),
      this.getNextColumn(column, direction),
      direction,
      color,
      pawns + 1
    );
  }

  rowIsOutsideBoard(row, board) {
    return row < 0 || row >= board.length;
  }

  columnIsOutsideBoard(column, board) {
    return column < 0 || column >= board.length;
  }

  getNextRow(row, direction) {
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

  getNextColumn(column, direction) {
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

  newGame() {
    this.setState(this.initState());
  }

  render() {
    return (
      <React.Fragment>
        <Board board={this.state.board} handleMove={this.handleMove} />
        <br />
        <h3>
          {this.state.inGame ? "Current player" : "The winner is"}:{" "}
          {this.state.currentPlayer === 1 ? (
            <span className="redcolor">Red</span>
          ) : (
            <span className="yellowcolor">Yellow</span>
          )}
        </h3>
        <br />
        <RestartButton show={!this.state.inGame} handleClick={this.newGame} />
      </React.Fragment>
    );
  }
}

function RestartButton(props) {
  const show = props.show;
  if (!show) {
    return null;
  }
  return (
    <button type="button" onClick={props.handleClick}>
      New Game
    </button>
  );
}

function IllegalArgumentException(message) {
  this.message = message;
  this.name = "IllegalArgumentException";
}

export default App;
