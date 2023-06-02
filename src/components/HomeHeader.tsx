import Avatar from '@mui/material/Avatar'
import Configuration from './Configuration'
import Grid from '@mui/material/Unstable_Grid2'
import Link from 'next/link'

export default function HomeHeader() {
    return (
        <Grid
            sx={{
                display: 'grid',
                gridTemplateColumns: '50px 1fr 50px',
                width: '100%',
            }}
        >
            <Grid display="flex" justifyContent="center">
                <Link href="/profile">
                    <Avatar src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/64/642f94f19259a798ef2ef84d506077537aeeb433.jpg" />
                </Link>
            </Grid>
            <Grid display="flex" justifyContent="center">
                <Configuration />
            </Grid>
            <Grid></Grid>
        </Grid>
    )
}
