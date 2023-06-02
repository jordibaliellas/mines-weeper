import {
    selectConfiguration,
    setConfiguration,
} from '@/state/slices/configuration.slice'
import { toPairs, values } from 'ramda'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import CustomConfiguration from './CustomConfiguration'
import { MinesweeperConfig } from '@/interfaces/minesweeper'

export enum Difficulties {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard',
    CUSTOM = 'Custom',
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
    [Difficulties.CUSTOM]: {
        columns: 0,
        rows: 0,
        mines: 0,
    },
}

export function isSameConfiguration(
    config: MinesweeperConfig,
    difficulty: Difficulties
): boolean {
    const configByDifficulty = configurationByDifficulty[difficulty]

    return toPairs(config).every(
        ([key, value]) => configByDifficulty[key] === value
    )
}

export default function Configuration() {
    const dispatch = useAppDispatch()

    const [selectedDifficulty, setDifficulty] = useState(Difficulties.EASY)
    const [opened, setOpened] = useState(false)
    const configuration = useAppSelector(selectConfiguration)

    useEffect(() => {
        if (isSameConfiguration(configuration, selectedDifficulty)) return

        const difficulty = values(Difficulties).find((difficulty) =>
            isSameConfiguration(configuration, difficulty)
        )

        setDifficulty(difficulty || Difficulties.CUSTOM)
    }, [configuration, selectedDifficulty])

    const onClickDifficulty = (difficulty: Difficulties) => {
        if (difficulty === Difficulties.CUSTOM) return handleCustomDifficulty()
        dispatch(setConfiguration(configurationByDifficulty[difficulty]!))
    }

    const handleCustomDifficulty = () => {
        setOpened(true)
    }

    const onCloseDialog = (config?: MinesweeperConfig) => {
        if (config) dispatch(setConfiguration(config))
        setOpened(false)
    }

    return (
        <>
            <ButtonGroup
                variant="outlined"
                aria-label="outlined primary button group"
            >
                {values(Difficulties).map((difficulty) => (
                    <Button
                        key={difficulty}
                        variant={
                            difficulty === selectedDifficulty
                                ? 'contained'
                                : 'outlined'
                        }
                        onClick={() => onClickDifficulty(difficulty)}
                    >
                        {difficulty}
                    </Button>
                ))}
            </ButtonGroup>
            <CustomConfiguration
                opened={opened}
                onCloseDialog={onCloseDialog}
            ></CustomConfiguration>
        </>
    )
}
