import { FC, PointerEvent, useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material'

import { be, defaultGameState, isLetter } from '@common/config'
import { GameState, GameProps } from '@common/interfaces'
import GuessWord from '@components/word'
import KeyBoard from '@components/keyboard'
import Result from './result'


const GameComponent : FC<GameProps> = ({ id = 0 }) => {
  const [ game, setGame ] = useState<GameState>( defaultGameState )


  const handleLetter = ( letter: string ) => {
    // console.log( letter )

    axios.post( be.game + '/' + id + '/guess', { 'letter': letter } )
    .then( res => {
      if ( res.statusText == 'OK' ) setGame( res.data.state )
    } )
    .catch( console.error )
  }
  

  const handleKeyPress = ( event: KeyboardEvent ) => {
    if ( game.guesses_incorrect_remaining > 0 && isLetter( event.code ) ) {
      handleLetter( event.key.toUpperCase() )
    }
  }


  const handleKeyClick = ( event: PointerEvent ) => {
    if ( game.guesses_incorrect_remaining > 0 ) {
      handleLetter( ( event?.target as HTMLInputElement )?.value?.toUpperCase() )
    }
  }

  
  useEffect( () => {
    if ( id > 0 && game.id == 0 ) {
      axios.get( be.game + '/' + id )
      .then( res => {
        if ( res.statusText == 'OK' ) {
          setGame( res.data )
        }
      } )
      .catch( console.error )
    }
  }, [ id ] )


  useEffect( () => {
    if ( game.id > 0 ) {
      if ( game.game_state == 'InProgress' ) {
        if ( window.onkeydown == null ) window.onkeydown = handleKeyPress
      } else {
        if ( window.onkeydown != null ) window.onkeydown = null
      }
    }
  }, [ game ] )
  

  return (
    <Card>
      <CardHeader
        title='Guess The Word'
        subheader='( You Can Also Use The KeyBoard )'
        action={
          <a href='/'>
            <button className={ 'guess-letter neumorph' }>
                Home
            </button>
          </a>
        }
      />
      <Divider />
      <CardContent sx={{ textAlign: 'center' }}>
        {/* WORD */}
        <GuessWord word={ game.word_state } />

        {/* RESULT */}
        <Result state={ game.game_state } />
        
        {/* KEYBOARD */}
        <KeyBoard clicked={ game.guesses } handler={ handleKeyClick } />
        
        {/* STATISTICS */}
        {/*
        <>
          GUESSES - REMAINING ( COUNT )
          <Typography>
            Guesses - Remaining ( Count ) : { game.guesses_incorrect_remaining }
          </Typography>
          
          GUESSES - INCORRECT ( COUNT )
          <Typography>
            Guesses - InCorrect ( Count ) : { game.guesses_incorrect }
          </Typography>

          GUESSES - INCORRECT ( LETTERS )
          <Typography>
            Guesses - InCorrect ( Letters ) : [ { game.guesses.filter( guess => !game.word_state.includes( guess ) ).join( ', ' ) } ]
          </Typography>
        </>
        */}
      </CardContent>
    </Card>
  )
}


export default GameComponent
