import {
    MinesWeeperCell,
    MinesWeeperGame,
    MinesweeperConfig,
} from '@/interfaces/minesweeper'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
    fillBoard,
    generateVoidGame,
    handleCellClick,
    handleRightClick,
} from '@/factories/minesweeper.factory'

import { RootState } from '../store'

const initialState: MinesWeeperGame = {
    isGameOver: false,
    isGameWon: false,
    isGenerated: false,
    board: [],
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setVoidBoard: (
            state,
            {
                payload,
            }: PayloadAction<Pick<MinesweeperConfig, 'columns' | 'rows'>>
        ) => generateVoidGame(payload),
        startGame: (
            state,
            {
                payload,
            }: PayloadAction<{
                cellClicked: MinesWeeperCell
                config: MinesweeperConfig
            }>
        ) => fillBoard(payload.cellClicked, payload.config),
        clickCell: (state, { payload }: PayloadAction<MinesWeeperCell>) =>
            handleCellClick(payload, state),
        rightCellClick: (state, { payload }: PayloadAction<MinesWeeperCell>) =>
            handleRightClick(payload, state),
    },
})

export const { setVoidBoard, startGame, clickCell, rightCellClick } =
    gameSlice.actions
export const selectGame = (state: RootState) => state.game
export default gameSlice.reducer
