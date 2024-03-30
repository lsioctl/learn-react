import './App.css';
import { useState } from 'react';

// we used destructuring for the argument (props object)
// so we avoid const value = props.index in the function
function Square({ symbol, onSquareClicked }) {
    return (
        <div className="square" onClick={onSquareClicked}>{symbol}</div>
    );
}

function GameStatus({ player, winner = null}) {
    let message = '';
    if (winner != null) {
        message = `Player ${winner} wins !`;
    } else {
        message = `Player ${player} turn`;
    }

    return (
        <div className="game_status">
            <div className="button-53">
                {message}
            </div>
        </div>
    );
}

function Button({ onClickCb, text }) {
    return (
        <div>
            <button className="button-53" onClick={onClickCb}>{text}</button>
        </div>
    )
}

export default function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null));

    const [player, setPlayer] = useState('X');

    const [winner, setWinner] = useState(null);

    const [history, setHistory] = useState([[...squares]]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const WINNING_INDEXES = getWinningIndexes();

    // TODO: too many and long functions heres, is there another way
    function resetGameCb() {
        setSquares(Array(9).fill(null));
        setPlayer('X');
        setWinner(null);
    }

    function setNextPlayer() {
        if (player === 'X') {
            setPlayer('O');
        } else {
            setPlayer('X');
        }
    }

    function prevHistoryCb() {
        if (historyIndex > 0) {
            setSquares(history[historyIndex - 1]);
            setHistory(history.slice(0, historyIndex));
            setHistoryIndex(historyIndex - 1);
        
            setNextPlayer();
            setWinner(null);
        }
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

                // set the correct value
                nextSquares[squareIndex] = player;

                // First ensure history contains no future
                // move, as we are creating a new future by clicking
                //const nextHistory = history.slice(0, historyIndex);
                const nextHistory = history.slice();
                nextHistory.push(nextSquares);
                
                // TODO: is a race condition possible here ? => should update both in
                // the same operation
                // update the history
                setHistory(nextHistory);
                setHistoryIndex(historyIndex + 1);

                // set the new state
                setSquares(nextSquares);

                const winner = checkWinner(nextSquares);

                if (winner !== 'None') {
                    setWinner(winner);
                }
                
                if (player === 'X') {
                    setPlayer('O');
                } else {
                    setPlayer('X');
                }
            }
        }
    }

    // TODO: props and function naming conventions with onEvent, eventCb, ... ?
    return (
        <>
            <GameStatus player={player} winner={winner}/>
            <Board squares={squares} squareClickedCb={squareClicked} />
            <div className="game_control">
                <Button onClickCb={resetGameCb} text='Reset game' />
                <Button onClickCb={prevHistoryCb} text='Prev move' />
            </div>

        </>
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


export function Board({squares, squareClickedCb, }) {
    // caveats for JS newbies: onSquareClicked must be a function
    // and not a function call, hence the use of anonymous function
    // TODO: error prone with the index typed manually
    return (
        <div className="board">
            <div className="board_row">
                <Square symbol={squares[0]} onSquareClicked={ () => squareClickedCb(0) }/>
                <Square symbol={squares[1]} onSquareClicked={ () => squareClickedCb(1) }/>
                <Square symbol={squares[2]} onSquareClicked={ () => squareClickedCb(2) }/>
            </div>
            <div className="board_row">
                <Square symbol={squares[3]} onSquareClicked={ () => squareClickedCb(3) }/>
                <Square symbol={squares[4]} onSquareClicked={ () => squareClickedCb(4) }/>
                <Square symbol={squares[5]} onSquareClicked={ () => squareClickedCb(5) }/>
            </div>
            <div className="board_row">
                <Square symbol={squares[6]} onSquareClicked={ () => squareClickedCb(6) }/>
                <Square symbol={squares[7]} onSquareClicked={ () => squareClickedCb(7) }/>
                <Square symbol={squares[8]} onSquareClicked={ () => squareClickedCb(8) }/>
            </div>
        </div>
    );
}
