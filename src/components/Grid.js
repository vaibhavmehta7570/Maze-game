import React from 'react'
import mario from '../images/mario.jpg'
import box from '../images/white.png'

const Grid = (props) => {
  const classname = props.value === 0 ? 'square zero' : 'square'
  return props.value === 0 ? (
    <img
      className={classname}
      onClick={() => props.clickHandler()}
      alt='mario'
      style={{ width: 60 }}
      src={mario}
    />
  ) : (
    <img
      className={classname}
      onClick={() => props.clickHandler()}
      style={{ width: 60 }}
      alt={props.value}
      src={box}
    />
  )
}

export default Grid
