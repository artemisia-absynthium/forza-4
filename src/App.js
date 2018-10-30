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
    this.countPawns = this.countPawns.bind(this);
    this.countPawnsRecursive = this.countPawnsRecursive.bind(this);
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
    this.fillColumn(column, this.state.board.length - 1);
    if (this.endGame()) {
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
      this.fillColumn(column, row - 1);
      return;
    }
    let board = this.state.board;
    board[row][column] = this.state.currentPlayer;
    this.setState({ board: board });
  }

  endGame() {
    let pawns = this.state.board;
    for (let i = 0; i < pawns.length; i++) {
      for (let j = 0; j < pawns[i].length; j++) {
        if (this.countPawns(i, j)) {
          return true;
        }
      }
    }
    return false;
  }

  countPawns(row, column) {
    let pawn = this.state.board[row][column];
    return (
      pawn !== 0 &&
      (this.countPawnsRecursive(row, column, "horizontal", pawn, 0) ||
      this.countPawnsRecursive(row, column, "vertical", pawn, 0) ||
      this.countPawnsRecursive(row, column, "downdiagonal", pawn, 0) ||
      this.countPawnsRecursive(row, column, "updiagonal", pawn, 0))
    );
  }

  countPawnsRecursive(row, column, direction, color, pawns) {
    let pawn = this.state.board[row][column];
    let count = pawn === 0 || pawn !== color ? 0 : pawns + 1;
    if (count === winCondition) {
      return true;
    }
    let nextRow = this.getNextRow(row, direction);
    let nextColumn = this.getNextColumn(column, direction);
    if (nextRow < 0 || nextRow >= this.state.board.length || nextColumn < 0 || nextColumn >= this.state.board[row].length) {
      return false;
    }
    return this.countPawnsRecursive(nextRow, nextColumn, direction, pawn, count);
  }

  getNextRow(row, direction) {
    switch (direction) {
      case "horizontal":
        return row;
      case "vertical":
      case "downdiagonal":
        return row + 1;
      case "updiagonal":
        return row - 1;
      default:
        throw new IllegalArgumentException("Unknown direction: '" + direction + "'");
    }
  }

  getNextColumn(column, direction) {
    switch (direction) {
      case "vertical":
        return column;
      case "horizontal":
      case "downdiagonal":
      case "updiagonal":
        return column + 1;
      default:
        throw new IllegalArgumentException("Unknown direction: '" + direction + "'");
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
