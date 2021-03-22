import React, { Component } from 'react'
import './Maze.css'
import Game from './Game'

class Puzzle extends Component {
  state = { board: [], size: 3, queen: [] }

  componentDidMount() {
    let size = 0
    size = parseInt(prompt('Enter the no of squares per row.'))
    if (typeof size == 'number' && size > 25) {
      alert(
        'maze is going out of your screen size. please enter the maze size in a range [1 > size <= 25].'
      )
      window.location.href = '/'
    }
    if (typeof size == 'number' && size > 1 && size <= 25) {
      this.startGame(size)
    } else {
      alert('Please input a number greater then 1')
      window.location.href = '/'
    }
  }

  isArrayUnique = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) !== i) return false
    }
    return true
  }

  startGame = (size) => {
    //Render the Maze in the number of squares given by the user.
    let maze = new Array(size * size)
    let queen = new Array(size)
    for (let i = 0; i < size * size; ++i) maze[i] = i

    do {
      for (let x = 0; x < size; x++) {
        queen[x] = Math.floor(Math.random() * (size * size - 1) + 1)
      }
    } while (!this.isArrayUnique(queen))

    console.log(queen)

    const length = size - 1
    let mid = Math.round(Math.abs((length * length) / 2))
    let middata = maze[mid]
    let firstdata = maze[0]
    maze[0] = middata
    maze[mid] = firstdata
    this.updateBoard(maze, size)
    this.setState({ size: size, queen })
  }
  updateBoard = (maze) => {
    this.setState({ board: maze })
  }
  restartGame = () => {
    window.location.href = '/'
  }
  render() {
    return (
      <div className='puzzle'>
        <h1 className='heading'>Maze Game</h1>

        {this.state && this.state.board ? (
          <Game
            size={this.state.size}
            board={this.state.board}
            updateBoard={this.updateBoard}
            queen={this.state.queen}
          />
        ) : null}
        <button onClick={this.restartGame}> Restart Game </button>
      </div>
    )
  }
}

export default Puzzle
