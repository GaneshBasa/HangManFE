import { ReactNode } from 'react'


export interface PageProps {
  title: string
  children?: ReactNode
}


export interface GameState {
  id: number
  game_state: string
  word_state: string
  guesses_incorrect: number
  guesses_incorrect_remaining: number
  guesses: string[]
}
