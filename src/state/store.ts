import configurationSlice from './slices/configuration.slice'
import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './slices/game.slice'
import profileReducer from './slices/darkMode.slice'
// ...

export const store = configureStore({
    reducer: {
        game: gameReducer,
        configuration: configurationSlice,
        profile: profileReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
