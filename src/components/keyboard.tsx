import { FC } from 'react'
import { KeyBoardInterface, KeyBoardButtonInterface } from '@src/common/interfaces'


const keyboard = [
  [ 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P' ],
  [ 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L' ],
  [ 'Z', 'X', 'C', 'V', 'B', 'N', 'M' ]
]


const KeyBoardButton : FC<KeyBoardButtonInterface> = ({ text, value, disabled, handler }) => {
  const label = text || value
  
  return (
    <button
      className={ `keyboard-button neumorph ${ disabled && 'invert disabled' }` }
      value={ value }
      disabled={ disabled }
      onClick={ handler }
    >
      {label}
    </button>
  )
}


const KeyBoard : FC<KeyBoardInterface> = ({ clicked, handler }) => {
  return (
    <div>
    {
      keyboard.map(
        row => (
          <div>
          {
            row.map(
              key =>
              <KeyBoardButton
                text={ key }
                value={ key }
                disabled={ clicked.includes( key ) }
                handler={ handler }
              />
            )
          }
          </div>
        )
      )
    }
    </div>
  )
}


export default KeyBoard
