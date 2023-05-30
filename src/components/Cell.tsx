import { BoardUpdater, MinesWeeperCell } from '@/interfaces/minesweeper'

import Button from '@mui/material/Button'

interface CellProps {
    cell: MinesWeeperCell
    onCellClick: BoardUpdater
}

function Content({ value }: { value: number }) {
    if (value === 0) return null
    if (value !== -1) return <span>{value}</span>

    return (
        <span role="img" aria-label="mine">
            💣
        </span>
    )
}

export default function Cell({ cell, onCellClick }: CellProps) {
    const { isRevealed } = cell
    return (
        <Button
            sx={{
                width: '30px',
                height: '30px',
                padding: '1px',
                fontSize: '12px',
                fontWeight: 'bold',
                minWidth: 'unset',
            }}
            variant="outlined"
            color="primary"
            disabled={isRevealed}
            onClick={() => onCellClick(cell)}
        >
            {isRevealed && <Content value={cell.value} />}
        </Button>
    )
}
