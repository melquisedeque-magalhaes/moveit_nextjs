import { ThemeProvider } from 'next-themes'
import '../styles/global.css'

import { ChallengesProvider } from '../contexts/ChallengesContext'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
        <ChallengesProvider>
            <Component {...pageProps} />
        </ChallengesProvider>
    </ThemeProvider>
  )
}

export default MyApp
