import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { be } from '@common/config'
import { GameState } from '@common/interfaces'
import { CenteredTableCell } from '@components/common'


const newGame = () => {
  axios.get( be.new_game )
  .then( res => {
    if ( res.statusText == 'Created' ) {
      window.open( '/game/' + res.data.id, '_self' )
    }
  } )
  .catch( console.error )

}


const IndexComponent : FC = () => {
  const [ games, setGames ] = useState<GameState[]>( [] )

  
  useEffect( () => {
    if ( games.length == 0 ) {
      axios.get( be.games )
      .then( res => {
        if ( res.statusText == 'OK' ) {
          setGames( res.data )
        }
      } )
      .catch( console.error )
    }
  }, [] )
  

  return (
    <TableContainer component={ Paper }>
      <Table>

        <TableHead>

          <TableRow>
            <CenteredTableCell rowSpan={ 2 }> ID </CenteredTableCell>
            <CenteredTableCell colSpan={ 2 }> State </CenteredTableCell>
            <CenteredTableCell colSpan={ 2 }> Guesses </CenteredTableCell>
            <CenteredTableCell> Action </CenteredTableCell>
            </TableRow>

          <TableRow>
            <CenteredTableCell> Game </CenteredTableCell>
            <CenteredTableCell> Word </CenteredTableCell>
            <CenteredTableCell> Incorrect </CenteredTableCell>
            <CenteredTableCell> Remaining </CenteredTableCell>
            <CenteredTableCell>
              <Button variant='outlined' color='warning' onClick={ newGame }>
                New Game
              </Button>
            </CenteredTableCell>
          </TableRow>

        </TableHead>

        <TableBody>

          {
            games.map( game => (
              <TableRow key={ game.id }>
                <CenteredTableCell> { game.id } </CenteredTableCell>
                <CenteredTableCell> { game.game_state } </CenteredTableCell>
                <CenteredTableCell> { game.word_state.split( '' ).join( ' ' ) } </CenteredTableCell>
                <CenteredTableCell> { game.guesses_incorrect } </CenteredTableCell>
                <CenteredTableCell> { game.guesses_incorrect_remaining } </CenteredTableCell>
                <CenteredTableCell>
                  <Button variant='outlined' color='info' href={ '/game/' + game.id }>
                    Load Game
                  </Button>
                </CenteredTableCell>
              </TableRow>
            ) )
          }

        </TableBody>

      </Table>
    </TableContainer>
  )
}


export default IndexComponent
