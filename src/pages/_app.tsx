import '@/styles/globals.scss'

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import ThemeWrapper from './../components/ThemeWrapper'
import { store } from '@/state/store'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeWrapper>
                <Component style={{ height: '100%' }} {...pageProps} />
            </ThemeWrapper>
        </Provider>
    )
}
