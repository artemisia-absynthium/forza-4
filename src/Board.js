import React, { Component } from "react";
import { getColor } from "./Player";
import "./App.css";

class Board extends Component {
  render() {
    return (
      <table className="board">
        <tbody>
          {this.props.board.map((pawnsRow, index) => (
            <BoardRow
              key={index}
              row={index}
              pawnsRow={pawnsRow}
              handleMove={this.props.handleMove}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

class BoardRow extends Component {
  render() {
    return (
      <tr>
        {this.props.pawnsRow.map((pawn, index) => (
          <Cell
            key={this.props.row + index}
            pawn={pawn}
            column={index}
            handleMove={this.props.handleMove}
          />
        ))}
      </tr>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <td className="pawn">
        <div
          className={"circle " + getColor(this.props.pawn)}
          onClick={
            this.props.pawn === 0
              ? () => this.props.handleMove(this.props.column)
              : null
          }
        />
      </td>
    );
  }
}

export function BoardOutOfBoundsException(message) {
  this.message = message;
  this.name = "BoardOutOfBoundsException";
}

export default Board;
