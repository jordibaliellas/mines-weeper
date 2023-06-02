import {
    PaletteOptions,
    ThemeProvider,
    createTheme,
} from '@mui/material/styles'
import { useEffect, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { props } from 'ramda'
import { selectProfile } from '@/state/slices/darkMode.slice'
import { useAppSelector } from '@/state/hooks'

interface ThemeWrapperProps {
    children: React.ReactNode
}

const createNewTheme = (mode: PaletteOptions['mode']) =>
    createTheme({
        palette: {
            mode,
        },
    })

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
    const [theme, setTheme] = useState(createNewTheme('dark'))
    const profile = useAppSelector(selectProfile)

    useEffect(() => {
        setTheme(createNewTheme(profile.themeMode))
    }, [profile])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
