import { GameState } from '@common/interfaces'


export const be_root = process.env.NEXT_PUBLIC_BE_DOMAIN

export const name = 'HangMan'

export const be = {
  root: be_root,
  games: be_root + '/games',
  game: be_root + '/game',
  new_game: be_root + '/game' + '/new'
}

export const defaultGameState: GameState = {
  id: 0,
  game_state: '',
  word_state: '',
  guesses_incorrect: 0,
  guesses_incorrect_remaining: 0,
  guesses: []
}

export const isLetter = ( eventCode: string ) => eventCode.startsWith( 'Key' )
