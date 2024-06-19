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


const openGame = ( gameID: number ) => window.open( '/game/' + gameID, '_self' )


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
              <TableRow key={ game.id } onClick={ _ => openGame( game.id ) }>
                <CenteredTableCell> { game.id } </CenteredTableCell>
                <CenteredTableCell> { game.game_state } </CenteredTableCell>
                <CenteredTableCell> { game.word_state } </CenteredTableCell>
                <CenteredTableCell> { game.guesses_incorrect_remaining } </CenteredTableCell>
                <CenteredTableCell> { game.guesses_incorrect } </CenteredTableCell>
              </TableRow>
            ) )
          }

        </TableBody>

      </Table>
    </TableContainer>
  )
}


export default IndexComponent
