import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ProfileConfig } from '@/interfaces/profile'
import { RootState } from '../store'

const initialState: ProfileConfig = {
    themeMode: 'dark',
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (
            state,
            { payload }: PayloadAction<Partial<ProfileConfig>>
        ) => {
            return { ...state, ...payload }
        },
    },
})

export const { setProfile } = profileSlice.actions
export const selectProfile = (state: RootState) => state.profile
export default profileSlice.reducer
