import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import {
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
            <CenteredTableCell rowSpan={ 2 }>
              <button className={ 'guess-letter neumorph disabled' } onClick={ newGame }>
                New Game
              </button>
            </CenteredTableCell>
            </TableRow>

          <TableRow>
            <CenteredTableCell> Game </CenteredTableCell>
            <CenteredTableCell> Word </CenteredTableCell>
            <CenteredTableCell> Incorrect </CenteredTableCell>
            <CenteredTableCell> Remaining </CenteredTableCell>
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
                  <a href={ '/game/' + game.id }>
                    <button className={ 'guess-letter neumorph' }>
                      Load
                    </button>
                  </a>
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
