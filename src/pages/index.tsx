import Configuration from '@/components/Configuration'
import MinesWeeper from '@/components/MinesWeeper'
import { Provider } from 'react-redux'
import Stack from '@mui/material/Stack'
import { store } from '@/state/store'

export default function Home() {
    return (
        <Provider store={store}>
            <Stack
                sx={{
                    alignItems: 'center',
                    p: 2,
                    gap: 2,
                    height: '100%',
                    width: '100%',
                }}
            >
                <Configuration />
                <MinesWeeper></MinesWeeper>
            </Stack>
        </Provider>
    )
}
