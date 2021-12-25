import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//This will return each single square on the board
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.j}
      </button>
    );
  }
}
//This function is to determine where the player wants to place their mark
function PlaySquare(props){
    return (
      <button className="square" onClick={props.onClick}>
        {props.j}
      </button>
    );
}
function winner(nowPoint,board){
  var win=0;
  var combo=1;
  const col=nowPoint%7;
  const row=(nowPoint-col)/7;
  var k=1;
  //Dig downwards
      while(board[(row+k)*7+col]===board[nowPoint]&&board[nowPoint]&&row+k<6){
        k++;
        combo++;
      }
      if(combo>3){
        win++;
      };
  //Upper-right & Lower-left
      combo=1;
      k=1;   
      while(board[(row-k)*7+col+k]===board[nowPoint]&&board[nowPoint]&&row-k>-1&&col+k<7){
        k++;
        combo++;
      }
      k=1;
      while(board[(row+k)*7+col-k]===board[nowPoint]&&board[nowPoint]&&row+k<6&&col-k>-1){
        k++;
        combo++;
      }
      if(combo>3){
        win++;
      };
  //Upper-left & Lower-right
  combo=1;
  k=1;   
      while(board[(row-k)*7+col-k]===board[nowPoint]&&board[nowPoint]&&row-k>-1&&col-k>-1){
        k++;
        combo++;
      }
      k=1;
      while(board[(row+k)*7+col+k]===board[nowPoint]&&board[nowPoint]&&row+k<6&&col+k<7){
        k++;
        combo++;
      }
      if(combo>3){
        win++;
      };
 //Left and right
  combo=1;
  k=1;   
      while(board[row*7+col-k]===board[nowPoint]&&board[nowPoint]&&col-k>-1){
        k++;
        combo++;
      }
      k=1;
      while(board[row*7+col+k]===board[nowPoint]&&board[nowPoint]&&col+k<7){
        k++;
        combo++;
      }
      if(combo>3){
        win++;
      };
  return win;
}
function determineWin(nowPoint,board,xIsNext){
    if(nowPoint<0){
      return(
        <div>This line is full, kindly change a line</div>);
    }
    else if(nowPoint>41){
      return(<div>Game start</div>);
    }
    else if(winner(nowPoint,board)){
              let i=xIsNext?"O" : "X";
      return(
        <div>Winner is {i}, wins {winner(nowPoint,board)} lines</div>);
    }
    else{
      return(
        <div>Fallpoint is {nowPoint}</div>);
    }
}

class Board extends React.Component {
//First I declare all the variables the would be used
//xIsNext stands for whether X shall be the player
//We set it as true by default
//Then squares stands for the clickable line where player wants to place the mark
//Board would be an array with 42 squares to display the marks
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(7).fill(null),
      board: Array(42).fill(null),
      xIsNext: true,
      //I was trying to make 2-dimension array so I assign pointers for each lines
      //points: Array(6).fill(0),
      //board: Array(6).fill(Array(7).fill(null)),
      nowPoint:42,
    };
  }
  handleClick(j) {
    const board = this.state.board.slice();
    const squares = this.state.squares.slice();
    const nowPoint=this.state.nowPoint;
    squares[j] = this.state.xIsNext ? 'X' : 'O';
    //var i=whereToPut(board,j);
    var k=0;
    for(var i=j;i<42;i+=7){
        if(i>34&&!board[i]){
          board[i]=squares[j];
          k=i;
          break;
        }
        else if(board[i]&&i<7){
          k=-1;
          break;
        }
        else if(board[i]){
          k=i-7;
          board[k]= squares[j];
          break;
        }
        else{
          continue;
        }
    }
    this.setState({
      board: board,
      squares: squares,
      xIsNext: !this.state.xIsNext,
      nowPoint:k,});
  }
  renderSquare(j) {
    return <Square 
             //j={this.state.board[j]} 
             j={this.state.board[j]}/>;
  }
  renderPlaySquare(j){
    
    if(!winner(this.state.nowPoint,this.state.board)){
      return(<PlaySquare 
         j={j+1} 
         onClick={() => this.handleClick(j)}
      />);
    }
    else return <PlaySquare 
         j={j+1} 
      />
  }
  restart(j){
    this.setState(
      {
        board:Array(42).fill(null),
        xIsNext: true,
        nowPoint:42,
      }
    );
  }
  render() {
    const status = (this.state.xIsNext ? "X" : "O")+'\'s turn';
    const fallPoint=determineWin(this.state.nowPoint,this.state.board,this.state.xIsNext);
    return (
      <div>
        <div className="title">Connect-4-game</div>
        <div className="status">{fallPoint}</div>
        <div className="status">Click on the number where to place the mark</div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderPlaySquare(0)}
          {this.renderPlaySquare(1)}
          {this.renderPlaySquare(2)}
          {this.renderPlaySquare(3)}
          {this.renderPlaySquare(4)}
          {this.renderPlaySquare(5)}
          {this.renderPlaySquare(6)}
        </div>
        <div className="status"></div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
        </div>
        <div className="board-row">
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
        </div>
        <div className="board-row">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
        </div>
        <div className="board-row">
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
        </div>
        <div className="board-row">
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
        </div>
        <div className="status"></div>
        <div className="status">{winner(this.state.nowPoint,this.state.board)?(<button onClick={()=>this.restart(1)}>Restart?</button>):null}</div>
        <div className="status"></div>
        <div className="title">Korone Daisuki</div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);