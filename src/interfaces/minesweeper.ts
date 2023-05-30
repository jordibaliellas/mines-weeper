export interface MinesweeperConfig {
    columns: number
    rows: number
    mines: number
}

export interface MinesWeeperCell {
    value: number
    isRevealed: boolean
    isFlagged: boolean
    row: number
    column: number
}
export type MinesWeeperBoard = MinesWeeperCell[][]
export type BoardUpdater = (cellClicked: MinesWeeperCell) => void
