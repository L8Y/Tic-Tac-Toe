import React from "react";


class Square extends React.Component {
    render(){
        return <button 
        className="square" 
        onClick={()=>this.props.onClick()}>
            {this.props.value}
        </button>
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        if(winner(squares)|| squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext? "X" : "O";
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });    
    }
    renderSquare(i) {
        return<Square 
        value={this.state.squares[i]}
        onClick={()=> this.handleClick(i)}
        />
    }

    render(){
        const gameWinner = winner(this.state.squares);
        let status;
        if(gameWinner) {
            status = "winner is " + gameWinner;
        } else {
            status = "Next player is " + (this.state.xIsNext? "X" : "O");
        }
        return(
            <div >
                <h1>Tic tac toe</h1>
                <div>
                    <section>
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                        {this.renderSquare(3)}
                    </section>
                    <section>
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                        {this.renderSquare(6)}
                    </section>
                    <section>
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                        {this.renderSquare(9)}
                    </section>
                </div>  
                <h2 className="status">{status}</h2>
                <button className="button" onClick={() => this.setState({squares: Array(9).fill(null)})} >Play Again</button>
            </div>
            
        );
    }
}

const winner = (squares) => {
    const probability = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [7,5,3],
        [1,5,9]
    ];
    for(let i = 0; i < probability.length; i++) {
        const [a, b, c] = probability[i];
        if(squares[a] === squares[b] && squares[a] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Board;