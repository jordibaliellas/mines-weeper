import {
    MinesWeeperCell,
    MinesWeeperGame,
    MinesweeperConfig,
} from '@/interfaces/minesweeper'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fillBoard, generateVoidGame } from '@/factories/minesweeper.factory'

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
        ) => {
            return generateVoidGame(payload)
        },
        startGame: (
            state,
            {
                payload,
            }: PayloadAction<{
                cellClicked: MinesWeeperCell
                config: MinesweeperConfig
            }>
        ) => {
            return fillBoard(payload.cellClicked, payload.config)
        },
    },
})

export const { setVoidBoard, startGame } = gameSlice.actions
export const selectGame = (state: RootState) => state.game
export default gameSlice.reducer
