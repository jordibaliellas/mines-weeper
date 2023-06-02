import HomeHeader from '@/components/HomeHeader'
import MinesWeeper from '@/components/MinesWeeper'
import Stack from '@mui/material/Stack'

export default function Home() {
    return (
        <Stack
            sx={{
                alignItems: 'center',
                p: 2,
                gap: 2,
                height: '100%',
                width: '100%',
            }}
        >
            <HomeHeader></HomeHeader>
            <MinesWeeper></MinesWeeper>
        </Stack>
    )
}
