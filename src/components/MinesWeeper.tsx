import {
    clickCell,
    rightCellClick,
    selectGame,
    setVoidBoard,
    startGame,
} from '@/state/slices/game.slice'
import { useAppDispatch, useAppSelector } from '@/state/hooks'

import Cell from './Cell'
import { MinesWeeperCell } from '@/interfaces/minesweeper'
import Stack from '@mui/material/Stack'
import { selectConfiguration } from '@/state/slices/configuration.slice'
import { useEffect } from 'react'

export default function MinesWeeper() {
    const gameConfig = useAppSelector(selectConfiguration)
    const game = useAppSelector(selectGame)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setVoidBoard(gameConfig))
    }, [gameConfig, dispatch])

    const onCellClick = (cellClicked: MinesWeeperCell) => {
        if (!game.isGenerated) {
            dispatch(startGame({ cellClicked, config: gameConfig }))
        }

        dispatch(clickCell(cellClicked))
    }

    const onRightClick = (cellClicked: MinesWeeperCell) => {
        if (!game.isGenerated) return

        dispatch(rightCellClick(cellClicked))
    }

    useEffect(() => {
        console.log('gaaameee: ', game)
    }, [game])

    return (
        <Stack>
            {game.board.map((row, rowIndex) => {
                return (
                    <Stack direction="row" key={rowIndex}>
                        {row.map((cellValue, cellIndex) => (
                            <Cell
                                key={`${rowIndex}-${cellIndex}`}
                                cell={cellValue}
                                game={game}
                                onCellClick={onCellClick}
                                onRightClick={onRightClick}
                            />
                        ))}
                    </Stack>
                )
            })}
        </Stack>
    )
}
