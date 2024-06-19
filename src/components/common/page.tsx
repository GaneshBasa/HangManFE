import Head from 'next/head'
import { FC, ReactNode } from 'react'
import { Box, Container } from '@mui/material'


interface Props {
  title: string
  children?: ReactNode
}


const Page : FC<Props> = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth={false}>
        {children}
      </Container>
    </Box>
  </>
)


export default Page
