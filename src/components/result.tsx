import { FC } from 'react'
import { Typography } from '@mui/material'


const Result : FC<{ state: string }> = ({ state }) => {
  let resultClass = '', resultText = ''

  if ( state == 'Won' ) {
    resultClass = 'success'
    resultText = '🥳 Congratulations!!! You WON'
  } else if ( state == 'Lost' ) {
    resultClass = 'error'
    resultText = '😞 Oops!!! You Lost'
  } else {
    return null
  }

  return (
    <div className={`neumorph invert disabled result ${resultClass}`}>
      {resultText}
    </div>
  )
}


export default Result
