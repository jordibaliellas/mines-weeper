import {
    MinesWeeperCell,
    MinesWeeperGame,
    MinesweeperConfig,
} from '@/interfaces/minesweeper'

const cellsArround = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
] as const

export function generateVoidGame({
    columns,
    rows,
}: Pick<MinesweeperConfig, 'columns' | 'rows'>): MinesWeeperGame {
    return {
        isGameOver: false,
        isGameWon: false,
        isGenerated: false,
        board: Array(rows)
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
            ),
    }
}

function fillMinesInBoard(
    board: MinesWeeperCell[][],
    cellClicked: MinesWeeperCell,
    { columns, rows, mines }: MinesweeperConfig
): MinesWeeperCell[][] {
    const minesPossiblePositions = generateMinesPossiblePositions(cellClicked, {
        columns,
        rows,
    })

    for (let index = 0; index < mines; index++) {
        const randomPosition = Math.floor(
            Math.random() * minesPossiblePositions.length
        )
        const cell = minesPossiblePositions[randomPosition]
        minesPossiblePositions.splice(randomPosition, 1)
        const rowIndex = Math.floor(cell / columns)
        const columnIndex = cell % columns
        board[rowIndex][columnIndex].value = -1
    }

    return board
}

function fillNumbersInBoard(
    board: MinesWeeperCell[][],
    { columns, rows, mines }: MinesweeperConfig
): MinesWeeperCell[][] {
    for (let index = 0; index < rows * columns; index++) {
        const rowIndex = Math.floor(index / columns)
        const columnIndex = index % columns
        if (board[rowIndex][columnIndex].value === -1) {
            continue
        }
        const cell = board[rowIndex][columnIndex]
        const cellsArroundCell = getCellsArroundCell(cell, board)
        cell.value = cellsArroundCell.filter(({ value }) => value === -1).length
    }
    return board
}

export function fillBoard(
    cellClicked: MinesWeeperCell,
    config: MinesweeperConfig
): MinesWeeperGame {
    const game = generateVoidGame({
        columns: config.columns,
        rows: config.rows,
    })
    game.isGenerated = true

    game.board = fillMinesInBoard(game.board, cellClicked, config)
    game.board = fillNumbersInBoard(game.board, config)

    return game
}

function generateMinesPossiblePositions(
    cell: MinesWeeperCell,
    { columns, rows }: Pick<MinesweeperConfig, 'columns' | 'rows'>
) {
    const minesPossiblePositions = Array(rows * columns)
        .fill(0)
        .map((_, i) => i)

    const cellPosition = cell.row * columns + cell.column

    const noMinesPositions = getPositionsArroundCell(cell, {
        rows,
        columns,
    }).map(([rowIndex, columnIndex]) => rowIndex * columns + columnIndex)
    noMinesPositions.push(cellPosition)

    return minesPossiblePositions.filter(
        (value) => !noMinesPositions.includes(value)
    )
}

function getPositionsArroundCell(
    cell: Pick<MinesWeeperCell, 'column' | 'row'>,
    { rows, columns }: Pick<MinesweeperConfig, 'columns' | 'rows'>
): [number, number][] {
    return cellsArround.reduce((positionsArround, [row, column]) => {
        const rowIndex = cell.row + row
        const columnIndex = cell.column + column

        const isCellValid =
            isRowValid(rowIndex, rows) && isColumnValid(columnIndex, columns)
        if (isCellValid) positionsArround.push([rowIndex, columnIndex])

        return positionsArround
    }, [] as [number, number][])
}

function getCellsArroundCell(
    cell: MinesWeeperCell,
    board: MinesWeeperGame['board']
): MinesWeeperCell[] {
    return getPositionsArroundCell(cell, {
        rows: board.length,
        columns: board[0].length,
    }).map(([rowIndex, columnIndex]) => board[rowIndex][columnIndex])
}

function isRowValid(row: number, totalRows: number): boolean {
    return row >= 0 && row < totalRows
}

function isColumnValid(column: number, totalColumns: number): boolean {
    return column >= 0 && column < totalColumns
}

export function handleRightClick(
    cell: MinesWeeperCell,
    game: MinesWeeperGame
): MinesWeeperGame {
    return discoverCells(cell, game)
}

export function discoverCells(
    cell: MinesWeeperCell,
    game: MinesWeeperGame
): MinesWeeperGame {
    game.board[cell.row][cell.column].isRevealed = true
    if (cell.value !== 0) return game

    const cellsToDiscoverArround: MinesWeeperCell[] = [cell]
    const cellsDiscoverdArround: string[] = []
    while (cellsToDiscoverArround.length) {
        const cellToDiscover = cellsToDiscoverArround.shift()
        const cellKey = `${cellToDiscover?.row}-${cellToDiscover?.column}`
        if (!cellToDiscover || cellsDiscoverdArround.includes(cellKey)) continue
        cellsDiscoverdArround.push(cellKey)

        const cellsArroundCellToDiscover = getCellsArroundCell(
            cellToDiscover,
            game.board
        )
        cellsArroundCellToDiscover.forEach((cellArround) => {
            cellArround.isRevealed = true
            if (cellArround.value === 0) {
                cellsToDiscoverArround.push(cellArround)
            }
        })
    }

    return game
}
