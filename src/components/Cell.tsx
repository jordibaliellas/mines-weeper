import {
    BoardUpdater,
    MinesWeeperCell,
    MinesWeeperGame,
} from '@/interfaces/minesweeper'

import Button from '@mui/material/Button'

interface CellProps {
    cell: MinesWeeperCell
    game: MinesWeeperGame
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
    if (value !== -1) {
        return <span style={{ color: numberColors[value - 1] }}>{value}</span>
    }

    return (
        <span role="img" aria-label="mine">
            💣
        </span>
    )
}

export default function Cell({
    cell,
    game,
    onCellClick,
    onRightClick,
}: CellProps) {
    const { isRevealed } = cell

    const clickWrapper = (fn: () => void) => (e: React.MouseEvent) => {
        e.preventDefault()
        if (game.isGameOver || game.isGameWon || cell.isRevealed) return
        fn()
    }

    const onLeftClick = clickWrapper(() => {
        onCellClick(cell)
    })
    const onContextMenu = clickWrapper(() => {
        onRightClick(cell)
    })

    const isCellError = isRevealed && game.isGameOver && cell.value === -1

    const backgroundColor = isCellError
        ? '#ff0000'
        : isRevealed
        ? '#c4c4c4'
        : 'white'

    return (
        <Button
            sx={{
                width: '30px',
                height: '30px',
                padding: '1px',
                fontSize: '12px',
                fontWeight: 'bold',
                minWidth: 'unset',
                backgroundColor,
                '&:hover': {
                    backgroundColor,
                },
            }}
            variant="outlined"
            color="primary"
            onClick={onLeftClick}
            onContextMenu={onContextMenu}
        >
            <Content cell={cell} />
        </Button>
    )
}
