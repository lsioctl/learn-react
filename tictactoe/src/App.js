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

function getWinningIndexes() {
    // Still have to figure a proper algorithm
    // in the meantime, checking against all the solutions should be fast enough ?
    const winning_indexes = [];

    // column indexes
    winning_indexes.push([0, 3, 6]);
    winning_indexes.push([1, 4, 7]);
    winning_indexes.push([2, 5, 8]);

    // row indexes
    winning_indexes.push([0, 1, 2]);
    winning_indexes.push([3, 4, 5]);
    winning_indexes.push([6, 7, 8]);

    // diagonal indexes
    winning_indexes.push([0, 4, 8]);
    winning_indexes.push([2, 4, 6]);

    return winning_indexes;
}


export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));

    const [player, setPlayer] = useState('X');

    const [winner, setWinner] = useState(null);

    const WINNING_INDEXES = getWinningIndexes();

    function resetGameCb() {
        setSquares(Array(9).fill(null));
        setPlayer('X');
        setWinner(null);
    }

    function checkWinner(squares) {
        let winner = 'None';
    
        // some() stops on the first true return
        WINNING_INDEXES.some(index_list => {
            // test against the index_list

            // first identify the player
            const player = squares[index_list[0]];

            // only parse if the square is marked by a player
            if (player !== null) {
                // every() stops on the first false return
                const result = index_list.every(idx => {
                    return squares[idx] === player;
                });

                // feels clumsy to modify in a some callback
                // Fonctional Programming paradigms loves more immutable things
                if (result !== false) {
                    winner = player;
                }

                return result;
            // no player, return false and go to the next some() iteration
            } else {
                return false;
            }
        });

        return winner;
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

                if (winner !== 'None') {
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
