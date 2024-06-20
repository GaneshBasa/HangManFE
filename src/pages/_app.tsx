import { FC } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import '@styles/globals.css'


const darkTheme = createTheme({ palette: { mode: 'dark' } })


const App : FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Component { ...pageProps } />
  </ThemeProvider>
)


export default App
