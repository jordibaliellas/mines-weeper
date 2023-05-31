import {
    MinesWeeperCell,
    MinesWeeperGame,
    MinesweeperConfig,
} from '@/interfaces/minesweeper'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
    fillBoard,
    generateVoidGame,
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
        rightClickCell: (state, { payload }: PayloadAction<MinesWeeperCell>) =>
            handleRightClick(payload, state),
    },
})

export const { setVoidBoard, startGame, rightClickCell } = gameSlice.actions
export const selectGame = (state: RootState) => state.game
export default gameSlice.reducer
