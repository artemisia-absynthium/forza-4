import Board, { BoardOutOfBoundsException } from "./Board";
import { meetsWinCondition } from "./boardUtils"
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.endGame = this.endGame.bind(this);
    this.newGame = this.newGame.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.fillColumn = this.fillColumn.bind(this);
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
    return (
      meetsWinCondition("horizontal", row, column, this.state.board) ||
      meetsWinCondition("vertical", row, column, this.state.board) ||
      meetsWinCondition("downdiagonal", row, column, this.state.board) ||
      meetsWinCondition("updiagonal", row, column, this.state.board)
    );
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

export default App;
