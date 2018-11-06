import React, { Component } from "react";
import { getColor } from "./Player";
import "./App.css";

class Board extends Component {
  render() {
    return (
      <div className="board">
          {this.props.board.map((pawnsRow, index) => (
            <BoardRow
              key={index}
              row={index}
              pawnsRow={pawnsRow}
              handleMove={this.props.handleMove}
            />
          ))}
      </div>
    );
  }
}

class BoardRow extends Component {
  render() {
    return (
      <div className="row">
        {this.props.pawnsRow.map((pawn, index) => (
          <Cell
            key={this.props.row + index}
            pawn={pawn}
            column={index}
            handleMove={this.props.handleMove}
          />
        ))}
      </div>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <div>
        <div className="cage" />
        <div
          className={"pawn circle " + getColor(this.props.pawn)}
          onClick={
            this.props.pawn === 0
              ? () => this.props.handleMove(this.props.column)
              : null
          }
        />
      </div>
    );
  }
}

export function BoardOutOfBoundsException(message) {
  this.message = message;
  this.name = "BoardOutOfBoundsException";
}

export default Board;
