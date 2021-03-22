import React, { Component } from 'react'
import Grid from './Grid'
import queen from '../images/queen.jpg'
import './Game.css'

export default class Game extends Component {
  state = {
    count: 0,
    zero: '',
    topMove: '',
    rightMove: '',
    bottomMove: '',
    leftMove: '',
  }
  componentWillMount() {
    this.findClickables(this.props.board, this.props.size)
  }
  componentWillReceiveProps(nextProps) {
    this.findClickables(nextProps.board, nextProps.size)
  }
  shouldComponentUpdate(nextProps) {
    const curr = this.props.board.join('')
    const next = nextProps.board.join('')
    return curr !== next
  }

  findClickables = (board, size) => {
    const zeroIndex = board.indexOf(0)
    const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size)
    const topMove =
      zeroCoordinate.row > 0
        ? this.getIndexFromCoord(
            zeroCoordinate.row - 1,
            zeroCoordinate.column,
            size
          )
        : null
    const rightMove =
      zeroCoordinate.column < size
        ? this.getIndexFromCoord(
            zeroCoordinate.row,
            zeroCoordinate.column + 1,
            size
          )
        : null
    const bottomMove =
      zeroCoordinate.row < size
        ? this.getIndexFromCoord(
            zeroCoordinate.row + 1,
            zeroCoordinate.column,
            size
          )
        : null
    const leftMove =
      zeroCoordinate.column > 0
        ? this.getIndexFromCoord(
            zeroCoordinate.row,
            zeroCoordinate.column - 1,
            size
          )
        : null

    this.setState({
      zero: zeroIndex,
      topMove: topMove,
      rightMove: rightMove,
      bottomMove: bottomMove,
      leftMove: leftMove,
    })
  }
  getCoordFromIndex = (idx, size) => {
    return {
      row: Math.floor(idx / size) + 1,
      column: (idx % size) + 1,
    }
  }
  getIndexFromCoord = (row, col, size) => {
    return size * (row - 1) + col - 1
  }
  cellClickHandler = (index) => {
    if (
      index === this.state.topMove ||
      index === this.state.rightMove ||
      index === this.state.bottomMove ||
      index === this.state.leftMove
    )
      this.nextBoard(index)
  }
  nextBoard = (index) => {
    this.setState({ count: this.state.count + 1 })

    const indexx = this.props.queen.indexOf(index)
    if (indexx > -1) {
      this.props.queen.splice(indexx, 1)
    }
    if (this.props.queen.length === 0) {
      alert(
        `Game Over. Total Steps to save all the queens: ${this.state.count + 1}`
      )
      window.location.href = '/'
    }

    console.log(this.props.queen)
    const board = this.props.board.slice()
    const temp = board[index]
    board[index] = board[this.state.zero]
    board[this.state.zero] = temp
    this.props.updateBoard(board)
  }
  render() {
    const squares = this.props.board.map((val, index) => {
      if ((index + 1) % this.props.size === 0) {
        if (this.props.queen.includes(val)) {
          return (
            <span key={'i' + index}>
              <img
                key={index}
                alt='queen'
                style={{ width: 60, height: 60 }}
                src={queen}
                onClick={() => this.cellClickHandler(index)}
              />
              <br />
            </span>
          )
        } else {
          return (
            <span key={'i' + index}>
              {
                <Grid
                  key={index}
                  value={val}
                  queen={this.props.queen}
                  clickHandler={() => this.cellClickHandler(index)}
                />
              }
              <br />
            </span>
          )
        }
      }
      if (this.props.queen.includes(val)) {
        return (
          <img
            key={index}
            alt='queen'
            style={{ width: 60, height: 60 }}
            src={queen}
            onClick={() => this.cellClickHandler(index)}
          />
        )
      } else {
        return (
          <Grid
            key={index}
            value={val}
            clickHandler={() => this.cellClickHandler(index)}
          />
        )
      }
    })
    return (
      <div className='board'>
        {squares}
        <div className='counter'>Count: {this.state.count}</div>
      </div>
    )
  }
}
