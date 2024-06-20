import { PropsWithChildren } from 'react'


export interface PageProps extends PropsWithChildren {
  title: string
}


export interface CenteredTableCellProps extends PropsWithChildren {
  rowSpan?: number
  colSpan?: number
}


export interface GameProps {
  id: number
}


export interface GameState {
  id: number
  game_state: string
  word_state: string
  guesses_incorrect: number
  guesses_incorrect_remaining: number
  guesses: string[]
}
