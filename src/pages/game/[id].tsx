import { FC } from 'react'
import { useRouter } from 'next/router'

import Page from '@components/page'
import GameComponent from '@components/game'


const IndexPage : FC = () => {
  const router = useRouter()
  const id = parseInt( router.query.id as string, 10 )

  return (
    <Page title='HangMan'>
      <GameComponent id={ id } />
    </Page>
  )
}


export default IndexPage
