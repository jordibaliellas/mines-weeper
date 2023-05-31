import Box from '@mui/material/Box'
import MinesWeeper from '@/components/MinesWeeper'
import { Provider } from 'react-redux'
import { store } from '@/state/store'

export default function Home() {
    return (
        <Provider store={store}>
            <Box>
                <MinesWeeper></MinesWeeper>
            </Box>
        </Provider>
    )
}
