import Head from 'next/head'
import { Box, Container } from '@mui/material'
import { FC, ReactNode } from 'react'

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
      <Container maxWidth={false}>{children}</Container>
    </Box>
  </>
)

export default Page
