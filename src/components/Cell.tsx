import { BoardUpdater, MinesWeeperCell } from '@/interfaces/minesweeper'

import Button from '@mui/material/Button'

interface CellProps {
    cell: MinesWeeperCell
    onCellClick: BoardUpdater
    onRightClick: BoardUpdater
}

const numberColors = [
    '#0100FA',
    '#018001',
    '#F90000',
    '#01007F',
    '#7F0001',
    '#00807F',
    '#000000',
    '#808080',
] as const

function Content({ cell }: { cell: MinesWeeperCell }) {
    const { value } = cell

    if (!cell.isRevealed) {
        return cell.isFlagged ? (
            <span role="img" aria-label="mine">
                🚩
            </span>
        ) : null
    }

    if (value === 0) return null
    if (value !== -1)
        return <span style={{ color: numberColors[value - 1] }}>{value}</span>

    return (
        <span role="img" aria-label="mine">
            💣
        </span>
    )
}

export default function Cell({ cell, onCellClick, onRightClick }: CellProps) {
    const { isRevealed } = cell

    const preventDefaultWrapper = (fn: () => void) => (e: React.MouseEvent) => {
        e.preventDefault()
        fn()
    }

    const onLeftClick = preventDefaultWrapper(() => onCellClick(cell))
    const onContextMenu = preventDefaultWrapper(() => onRightClick(cell))

    return (
        <Button
            sx={{
                width: '30px',
                height: '30px',
                padding: '1px',
                fontSize: '12px',
                fontWeight: 'bold',
                minWidth: 'unset',
                backgroundColor: isRevealed ? '#c4c4c4' : 'white',
                '&:hover': {
                    backgroundColor: isRevealed ? '#c4c4c4' : 'white',
                },
            }}
            variant="outlined"
            color="primary"
            disabled={isRevealed}
            onClick={onLeftClick}
            onContextMenu={onContextMenu}
        >
            <Content cell={cell} />
        </Button>
    )
}
