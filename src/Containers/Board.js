import React, { Component } from 'react';

class Square extends Component {
	render() {
		return(
			<button onClick={this.props.clickHandler}>
				{this.props.value}
			</button>
		);
	}
}

class Board extends Component {
	constructor() {
		super();
		this.state = {
			isXTurn: true,
			squares: Array(9).fill(null),
			gameOver: false,
			winner: null
		};
	}

	getBoard() {
		let board = [],
			i = null;

		for(i=0; i<9; i++) {
			board.push(this.renderSquare(i));
			( (i+1)%3===0 ) ? board.push(<br key={'br'+i.toString()}/>) : null;
		}

		return (board);
	}

	// i is the square's index
	renderSquare(i) {
		return <Square key={i} value={this.state.squares[i]} clickHandler={() => this.squareClickHandler(i)} />;
	}

	squareClickHandler(i) {
		if(!this.state.gameOver && this.state.squares[i] === null) {
			let squares = this.state.squares;
			squares[i] = (this.state.isXTurn) ? 'X' : 'O';
			
			this.setState({
				isXTurn: !this.state.isXTurn,
				squares: squares,
				gameOver: false,
				winner: null
			});

			this.calculateWinner(squares);
		}
	}

	calculateWinner(squares) {
	  const lines = [
	    [0, 1, 2],
	    [3, 4, 5],
	    [6, 7, 8],
	    [0, 3, 6],
	    [1, 4, 7],
	    [2, 5, 8],
	    [0, 4, 8],
	    [2, 4, 6],
	  ];
	  for (let i = 0; i < lines.length; i++) {
	    const [a, b, c] = lines[i];
	    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
	      console.log(squares[a]);
	      this.setState({
	      	isXTurn: this.state.isXTurn,
			squares: this.state.squares,
			gameOver: true,
			winner: squares[a]
	      })
	      return squares[a];
	    }
	  }
	  return null;
	}

	render() {
		return(
			<main className="board">
				<section>
					{this.getBoard()}
				</section>
				<h2>{(this.state.winner !== null) ? 'Winner: '+this.state.winner : ''}</h2>
			</main>
		);
	}
}

export default Board;