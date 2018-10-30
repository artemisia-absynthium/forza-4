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
        if (this.countPawns(pawns, i, j, 0)) {
          return true;
        }
      }
    }
    return false;
  }

  countPawns(pawns, row, column) {
    let pawn = pawns[row][column];
    return (
      pawn !== 0 &&
      (this.countPawnsInRow(pawns, row, column + 1, pawn, 1) ||
        this.countPawnsInColumn(pawns, row + 1, column, pawn, 1) ||
        this.countPawnsInDownwardDiagonal(
          pawns,
          row + 1,
          column + 1,
          pawn,
          1
        ) ||
        this.countPawnsInUpwardDiagonal(pawns, row - 1, column + 1, pawn, 1))
    );
  }

  countPawnsInRow(pawns, row, column, pawnType, pawnsCount) {
    if (pawnsCount === winCondition) {
      return true;
    }
    if (column >= pawns[row].length) {
      return false;
    }
    let pawn = pawns[row][column];
    return (
      pawn === pawnType &&
      this.countPawnsInRow(pawns, row, column + 1, pawn, pawnsCount + 1)
    );
  }

  countPawnsInColumn(pawns, row, column, pawnType, pawnsCount) {
    if (pawnsCount === winCondition) {
      return true;
    }
    if (row >= pawns.length) {
      return false;
    }
    let pawn = pawns[row][column];
    return (
      pawn === pawnType &&
      this.countPawnsInColumn(pawns, row + 1, column, pawn, pawnsCount + 1)
    );
  }

  countPawnsInDownwardDiagonal(pawns, row, column, pawnType, pawnsCount) {
    if (pawnsCount === winCondition) {
      return true;
    }
    if (row >= pawns.length || column >= pawns[row].length) {
      return false;
    }
    let pawn = pawns[row][column];
    return (
      pawn === pawnType &&
      this.countPawnsInDownwardDiagonal(
        pawns,
        row + 1,
        column + 1,
        pawn,
        pawnsCount + 1
      )
    );
  }

  countPawnsInUpwardDiagonal(pawns, row, column, pawnType, pawnsCount) {
    if (pawnsCount === winCondition) {
      return true;
    }
    if (row < 0 || row >= pawns.length || column >= pawns[row].length) {
      return false;
    }
    let pawn = pawns[row][column];
    return (
      pawn === pawnType &&
      this.countPawnsInUpwardDiagonal(
        pawns,
        row - 1,
        column + 1,
        pawn,
        pawnsCount + 1
      )
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
