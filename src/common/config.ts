export const be_root = process.env.NEXT_PUBLIC_BE_DOMAIN

export const name = 'HangMan'

export const be = {
  root: be_root,
  game: be_root + '/game',
  new_game: be_root + '/game' + '/new',
  // new_game: game + '/new',
  // guess: game + id + '/guess'
}