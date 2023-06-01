import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { MinesweeperConfig } from '@/interfaces/minesweeper'
import { setConfiguration } from '@/state/slices/configuration.slice'
import { useAppDispatch } from '@/state/hooks'

export enum Difficulties {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
}

export const configurationByDifficulty: Record<
    Difficulties,
    MinesweeperConfig
> = {
    [Difficulties.EASY]: {
        columns: 8,
        rows: 8,
        mines: 10,
    },
    [Difficulties.MEDIUM]: {
        columns: 16,
        rows: 16,
        mines: 40,
    },
    [Difficulties.HARD]: {
        columns: 31,
        rows: 16,
        mines: 99,
    },
}

export default function BasicButtonGroup() {
    const dispatch = useAppDispatch()

    const onClickDifficulty = (difficulty: Difficulties) => {
        dispatch(setConfiguration(configurationByDifficulty[difficulty]))
    }

    return (
        <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
        >
            <Button onClick={() => onClickDifficulty(Difficulties.EASY)}>
                Easy
            </Button>
            <Button onClick={() => onClickDifficulty(Difficulties.MEDIUM)}>
                Medium
            </Button>
            <Button onClick={() => onClickDifficulty(Difficulties.HARD)}>
                Hard
            </Button>
            <Button>Custom</Button>
        </ButtonGroup>
    )
}
