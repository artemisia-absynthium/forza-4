import React, { Component } from "react";

var pawns = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

const pawnShape = [<div class="circle"></div>, <div class="circle red"></div>, <div class="circle yellow"></div>]

function initBoard() {
    for (let i = 0; i < pawns.length; i++) {
        for (let j = 0; j < pawns[i].length; j++) {
            pawns[i][j] = 0;
        }
    }
}

class BoardRow extends Component {
    render() {
        const pawnsRow = this.props.row.map((pawn, index) => (
            <td
                className="Pawn"
                key={index}
                onClick={() => this.props.handleClick(index)}
            >
                {pawnShape[pawn]}
            </td>
        ));
        return <tr>{pawnsRow}</tr>;
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

class Board extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.fillColumn = this.fillColumn.bind(this);
        this.endGame = this.endGame.bind(this);
        this.newGame = this.newGame.bind(this);
        this.state = { currentPlayer: 1, inGame: true };
    }

    onClick(column) {
        if (this.state.inGame) {
            this.fillColumn(column, pawns.length - 1);
        }
    }

    fillColumn(column, row) {
        if (row < 0) {
            return;
        }
        if (pawns[row][column] !== 0) {
            this.fillColumn(column, row - 1);
            return;
        }
        pawns[row][column] = this.state.currentPlayer;
        if (this.endGame()) {
            this.setState({ inGame: false });
        } else {
            this.setState({
                currentPlayer: this.state.currentPlayer === 1 ? 2 : 1
            });
        }
    }

    endGame() {
        for (let i = 0; i < pawns.length; i++) {
            for (let j = 0; j < pawns[i].length; j++) {
                if (this.countPawns(i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    countPawns(row, column, pawnsCount) {
        if (pawnsCount === 4) {
            return true;
        }
        if (row >= pawns.length || column >= pawns[row].length) {
            return false;
        }
        let pawn = pawns[row][column];
        return (
            pawn !== 0 &&
            (this.countPawnsInRow(row, column + 1, pawn, pawnsCount + 1) ||
                this.countPawnsInColumn(
                    row + 1,
                    column,
                    pawn,
                    pawnsCount + 1
                ) ||
                this.countPawnsInDownwardDiagonal(
                    row + 1,
                    column + 1,
                    pawn,
                    pawnsCount + 1
                ) ||
                this.countPawnsInUpwardDiagonal(
                    row - 1,
                    column + 1,
                    pawn,
                    pawnsCount + 1
                ))
        );
    }

    countPawnsInRow(row, column, pawnType, pawnsCount) {
        if (pawnsCount === 4) {
            return true;
        }
        if (column >= pawns[row].length) {
            return false;
        }
        let pawn = pawns[row][column];
        return (
            pawn === pawnType &&
            this.countPawnsInRow(row, column + 1, pawn, pawnsCount + 1)
        );
    }

    countPawnsInColumn(row, column, pawnType, pawnsCount) {
        if (pawnsCount === 4) {
            return true;
        }
        if (row >= pawns.length) {
            return false;
        }
        let pawn = pawns[row][column];
        return (
            pawn === pawnType &&
            this.countPawnsInColumn(row + 1, column, pawn, pawnsCount + 1)
        );
    }

    countPawnsInDownwardDiagonal(row, column, pawnType, pawnsCount) {
        if (pawnsCount === 4) {
            return true;
        }
        if (row >= pawns.length || column >= pawns[row].length) {
            return false;
        }
        let pawn = pawns[row][column];
        return (
            pawn === pawnType &&
            this.countPawnsInDownwardDiagonal(
                row + 1,
                column + 1,
                pawn,
                pawnsCount + 1
            )
        );
    }

    countPawnsInUpwardDiagonal(row, column, pawnType, pawnsCount) {
        if (pawnsCount === 4) {
            return true;
        }
        if (row < 0 || row >= pawns.length || column >= pawns[row].length) {
            return false;
        }
        let pawn = pawns[row][column];
        return (
            pawn === pawnType &&
            this.countPawnsInUpwardDiagonal(
                row - 1,
                column + 1,
                pawn,
                pawnsCount + 1
            )
        );
    }

    newGame() {
        initBoard();
        this.setState({
            currentPlayer: this.state.currentPlayer === 1 ? 2 : 1,
            inGame: true
        });
    }

    render() {
        const pawnsTable = pawns.map((pawnsRow, index) => (
            <BoardRow key={index} row={pawnsRow} handleClick={this.onClick} />
        ));
        return (
            <>
                <table className="board">
                    <tbody>{pawnsTable}</tbody>
                </table>
                <br />
                <h3>
                    {this.state.inGame ? "Current player" : "The winner is"}:{" "}
                    {this.state.currentPlayer === 1 ? (
                        <span className="RedPlayer">Red</span>
                    ) : (
                        <span className="YellowPlayer">Yellow</span>
                    )}
                </h3>
                <br />
                <RestartButton
                    show={!this.state.inGame}
                    handleClick={this.newGame}
                />
            </>
        );
    }
}

export default Board;
