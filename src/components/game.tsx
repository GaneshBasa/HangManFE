import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material'

import { be, defaultGameState, isLetter } from '@common/config'
import { GameState, GameProps } from '@common/interfaces'


const GameComponent : FC<GameProps> = ({ id = 0 }) => {
  const [ game, setGame ] = useState<GameState>( defaultGameState )
  

  const handleKeyDown = ( event: KeyboardEvent ) => {
    if ( game.guesses_incorrect_remaining > 0 && isLetter( event.code ) ) {
      const letter = event.key.toUpperCase()
  
      axios.post( be.game + '/' + id + '/guess', { 'letter': letter } )
      .then( res => {
        if ( res.statusText == 'OK' ) setGame( res.data.state )
      } )
      .catch( console.error )
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
        if ( window.onkeydown == null ) window.onkeydown = handleKeyDown
      } else {
        if ( window.onkeydown != null ) window.onkeydown = null
      }
    }
  }, [ game ] )
  

  return (
    <Card>
      <CardHeader
        title={ `Game ${ game.id } - ${ game.game_state }` }
        action={
          <Button variant='outlined' color='info' href='/'>
            Games List
          </Button>
        }
      />
      <Divider />
      <CardContent>
        {/* FIGURE */}
        
        {/* WORD */}
        { game.word_state.split( '' ).join( ' ' ) }
        
        {/* KEYS / KEYBOARD */}
        
        {/* GUESSES - REMAINING ( COUNT ) */}
        
        {/* GUESSES - INCORRECT ( COUNT ) */}

        {/* GUESSES - INCORRECT ( LETTERS ) */}
      </CardContent>
    </Card>
  )
}


export default GameComponent
