import './App.css';
import { useState } from 'react';

// we used destructuring for the argument (props object)
// so we avoid const value = props.index in the function
function Square({ symbol, onSquareClicked }) {
    return (
        <button className="square" onClick={onSquareClicked}>{symbol}</button>
    );
}

function GameStatus({ player, winner = null}) {
    let message = '';
    if (winner != null) {
        message = `player ${winner} wins !`;
    } else {
        message = `player ${player} turn`;
    }

    return (
        <div>
            {message}
        </div>
    );
}

function GameControl({ resetGameCb }) {
    return (
        <button onClick={resetGameCb}>Reset Game</button>
    );
}


export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));

    const [player, setPlayer] = useState('X');

    const [winner, setWinner] = useState(null);

    function resetGameCb() {
        setSquares(Array(9).fill(null));
        setPlayer('X');
        setWinner(null);
    }

    function getIndex(row, col) {
        return (row * N_COL) + col;
    }

    function checkWinner(squares) {
        const N_ROW = 3;
        const N_COL = 3;
        let no_winner = 'None';

        // check rows for row winners
        // we use a label to use with continue
        checkRow: for (let row = 0; row < N_ROW; row++) {
            console.log('row winner: row loop');
            let previous = null;
            let current = null;

            for (let col = 0; col < N_COL; col++) {
                console.log(`row winner: col loop: ${col}`);

                current = squares[getIndex(row, col)];
                console.log(`current: ${current}, row: ${row}`);

                if (current == null) {
                    // failure, check another row
                    console.log("continue checkRow");
                    continue checkRow;
                }
                
                if (previous == null) {
                    previous = current;
                    // we are at the start of the row
                    // go to next column
                    console.log("start of the row, continue col");
                    continue;
                }

                if (current == previous) {
                    // success and go to next column
                    // previous doesn't need update
                    // because its the same as current. TODO: clumsy ?
                    console.log("continue col");
                    continue;
                } else {
                    // failure, check another row
                    console.log("continue checkRow");
                    continue checkRow;
                }
            }

            // We got through each column, return the winner
            return current;
        }

        // check for diagonal

        // checkRow loop did not return
        return no_winner;
    }

    function squareClicked(squareIndex) {
        if (winner === null) {
            // only change if the current square is not yet clicked
            if (squares[squareIndex] === null) {
                // work in the immutable way => copy the state
                const nextSquares = squares.slice();

                // get the current player
                const symbol = player;
                // set the correct value
                nextSquares[squareIndex] = symbol;

                // set the new state
                setSquares(nextSquares);

                const winner = checkWinner(nextSquares);

                if (winner != 'None') {
                    setWinner(winner);
                }
                
                if (symbol === 'X') {
                    setPlayer('O');
                } else {
                    setPlayer('X');
                }
            }
        }
    }

    // caveats for JS newbies: onSquareClicked must be a function
    // and not a function call, hence the use of anonymous function
    // TODO: error prone with the index typed manually
    return (
        <>
            <GameStatus player={player} winner={winner}/>
            <div className="board-row">
                <Square symbol={squares[0]} onSquareClicked={ () => squareClicked(0) }/>
                <Square symbol={squares[1]} onSquareClicked={ () => squareClicked(1) }/>
                <Square symbol={squares[2]} onSquareClicked={ () => squareClicked(2) }/>
            </div>
            <div className="board-row">
                <Square symbol={squares[3]} onSquareClicked={ () => squareClicked(3) }/>
                <Square symbol={squares[4]} onSquareClicked={ () => squareClicked(4) }/>
                <Square symbol={squares[5]} onSquareClicked={ () => squareClicked(5) }/>
            </div>
            <div className="board-row">
                <Square symbol={squares[6]} onSquareClicked={ () => squareClicked(6) }/>
                <Square symbol={squares[7]} onSquareClicked={ () => squareClicked(7) }/>
                <Square symbol={squares[8]} onSquareClicked={ () => squareClicked(8) }/>
            </div>
            <GameControl resetGameCb={resetGameCb} />
        </>
    );
}
