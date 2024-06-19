import { FC, useEffect } from 'react'
import { Card } from '@mui/material'

import { be } from '@common/config'


const IndexComponent : FC = () => {
  useEffect( () => {
    fetch( be.game + '/' + 1 )
    .then( res => {
      if( res.ok ) return res.json()
    } )
    .then( console.log )
    .catch( console.error )
  }, [] )

  return <Card />
}


export default IndexComponent
