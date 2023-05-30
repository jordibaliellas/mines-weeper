import { BoardUpdater, MinesWeeperBoard } from '@/interfaces/minesweeper'

import Cell from './Cell'
import Stack from '@mui/material/Stack'

interface MinesWeeperProps {
    board: MinesWeeperBoard
    onCellClick: BoardUpdater
}

export default function MinesWeeper({ board, onCellClick }: MinesWeeperProps) {
    return (
        <Stack>
            {board.map((row, rowIndex) => {
                return (
                    <Stack direction="row" key={rowIndex}>
                        {row.map((cellValue, cellIndex) => (
                            <Cell
                                key={`${rowIndex}-${cellIndex}`}
                                cell={cellValue}
                                onCellClick={onCellClick}
                            />
                        ))}
                    </Stack>
                )
            })}
        </Stack>
    )
}
