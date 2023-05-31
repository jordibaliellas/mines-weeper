import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { MinesweeperConfig } from '@/interfaces/minesweeper'
import { RootState } from '../store'

const initialState: MinesweeperConfig = {
    columns: 8,
    rows: 8,
    mines: 10,
}

export const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        setConfiguration: (
            state,
            { payload }: PayloadAction<Partial<MinesweeperConfig>>
        ) => {
            return { ...state, ...payload }
        },
    },
})

export const { setConfiguration } = configurationSlice.actions
export const selectConfiguration = (state: RootState) => state.configuration
export default configurationSlice.reducer
