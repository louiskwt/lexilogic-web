import React from 'react'
import './styles.css'

const Loader = ({ size }) => {
  // Allow props to be passed in to resize loader

  return (
    <div className={'loader ' + (size === 'small' ? 'small' : '')}>
          <div></div><div></div><div></div>
    </div>
  )
}

export default Loader