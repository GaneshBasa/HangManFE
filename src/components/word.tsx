import { FC } from 'react'


const GuessLetter : FC<{ letter: string }> = ({ letter }) => (
  <span className='guess-letter neumorph invert disabled'>
    { letter != '_' ? letter : '-' }
  </span>
)


const GuessWord : FC<{ word: string }> = ({ word }) => (
  <div className='guess-word'>
  {
    word.split( '' ).map(
      ( letter, index ) => (
        <GuessLetter letter={ letter } key={ index }/>
      )
    )
  }
  </div>
)


export default GuessWord
