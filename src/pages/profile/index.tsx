import { PaletteOptions, SelectChangeEvent } from '@mui/material'
import { selectProfile, setProfile } from '@/state/slices/darkMode.slice'
import { useAppDispatch, useAppSelector } from '@/state/hooks'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Link from 'next/link'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'

export default function Profile() {
    const profile = useAppSelector(selectProfile)
    const dispatch = useAppDispatch()

    const handleThemeModeChange = (event: SelectChangeEvent) => {
        dispatch(
            setProfile({
                themeMode: event.target.value as PaletteOptions['mode'],
            })
        )
    }

    return (
        <Box
            sx={{
                alignItems: 'center',
                flexDirection: 'column',
                display: 'flex',
                p: 2,
                gap: 2,
                height: '100%',
                width: '100%',
            }}
        >
            <Grid
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '50px 1fr 50px',
                    width: '100%',
                }}
            >
                <Grid display="flex" justifyContent="center">
                    <Link href="/">
                        <Avatar src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/64/642f94f19259a798ef2ef84d506077537aeeb433.jpg" />
                    </Link>
                </Grid>
                <Grid display="flex" justifyContent="center">
                    <Typography variant="h3" gutterBottom>
                        Profile
                    </Typography>
                </Grid>
                <Grid></Grid>
            </Grid>
            <Card sx={{ maxWidth: '50%' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Settings
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Theme mode
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={profile.themeMode}
                            label="Theme mode"
                            onChange={handleThemeModeChange}
                        >
                            <MenuItem value={'light'}> Light </MenuItem>
                            <MenuItem value={'dark'}> Dark </MenuItem>
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
        </Box>
    )
}
