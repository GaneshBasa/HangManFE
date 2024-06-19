import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material'

import { be } from '@common/config'
import { GameState } from '@common/interfaces'


const defaultGameState: GameState = {
  id: 0,
  game_state: '',
  word_state: '',
  guesses_incorrect: 0,
  guesses_incorrect_remaining: 0,
  guesses: []
}


const isLetter = ( eventCode: string ) => eventCode.startsWith( 'Key' )


const IndexComponent : FC = () => {
  const [ gameID, setGameID ] = useState<number>( 0 )
  const [ game, setGame ] = useState<GameState>( defaultGameState )
  

  const handleKeyDown = ( event: KeyboardEvent ) => {
    if ( game.guesses_incorrect_remaining > 0 && isLetter( event.code ) ) {
      const letter = event.key.toUpperCase()
  
      axios.post( be.game + '/' + gameID + '/guess', { 'letter': letter } )
      .then( res => {
        if ( res.statusText == 'OK' ) setGame( res.data.state )
      } )
      .catch( console.error )
    }
  }

  
  useEffect( () => {
    if ( game.id == 0 ) {
      axios.get( be.game + '/' + gameID )
      .then( res => {
        if ( res.statusText == 'OK' ) {
          setGame( res.data )
        }
      } )
      .catch( console.error )
    }
  }, [] )


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
      <CardHeader title={ `Game ${ game.id } - ${ game.game_state }` } />
      <Divider />
      <CardContent>
        { game.word_state.split( '' ).join( ' ' ) }
      </CardContent>
    </Card>
  )
}


export default IndexComponent
