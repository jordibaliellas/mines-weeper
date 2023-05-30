import {
    MinesWeeperBoard,
    MinesWeeperCell,
    MinesweeperConfig,
} from '@/interfaces/minesweeper'

export function generateVoidBoard({
    columns,
    rows,
}: Pick<MinesweeperConfig, 'columns' | 'rows'>): MinesWeeperBoard {
    return Array(rows)
        .fill(0)
        .map((v, row): MinesWeeperCell[] =>
            Array(columns)
                .fill(0)
                .map((c, column) => ({
                    isFlagged: false,
                    isRevealed: false,
                    value: 0,
                    row,
                    column,
                }))
        )
}

export function generateBoard(
    cellClicked: MinesWeeperCell,
    { columns, rows, mines }: MinesweeperConfig
): MinesWeeperBoard {
    const board = generateVoidBoard({ columns, rows })
    board[cellClicked.row][cellClicked.column].isRevealed = true
    const minesPosiblePositions = Array(rows * columns).fill(0)

    for (let index = 0; index < mines; index++) {
        const randomPosition = Math.floor(
            Math.random() * minesPosiblePositions.length
        )
        minesPosiblePositions.splice(randomPosition, 1)
        const rowIndex = Math.floor(randomPosition / columns)
        const columnIndex = randomPosition % columns
        board[rowIndex][columnIndex] = {
            value: -1,
            isRevealed: false,
            isFlagged: false,
            row: rowIndex,
            column: columnIndex,
        }
    }

    for (let index = 0; index < rows * columns; index++) {
        const rowIndex = Math.floor(index / columns)
        const columnIndex = index % columns
        if (board[rowIndex][columnIndex].value === -1) {
            continue
        }
        const cell = board[rowIndex][columnIndex]
        const cellsArround = cellsArroundCell(cell, board)
        cell.value = cellsArround.filter(({ value }) => value === -1).length
    }

    return board
}

function cellsArroundCell(
    cell: MinesWeeperCell,
    board: MinesWeeperBoard
): MinesWeeperCell[] {
    const cellsArround: MinesWeeperCell[] = []

    for (let row = -1; row < 2; row++) {
        for (let column = -1; column < 2; column++) {
            if (row === 0 && column === 0) continue
            const rowIndex = cell.row + row
            const columnIndex = cell.column + column

            const isCellValid =
                isRowValid(rowIndex, board) && isColumnValid(columnIndex, board)
            if (!isCellValid) continue

            cellsArround.push(board[rowIndex][columnIndex])
        }
    }

    return cellsArround
}

function isRowValid(row: number, board: MinesWeeperBoard) {
    return row >= 0 && row < board.length
}

function isColumnValid(column: number, board: MinesWeeperBoard) {
    return column >= 0 && column < board[0].length
}
