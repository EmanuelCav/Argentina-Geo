import { configureStore } from '@reduxjs/toolkit'

import gameReducer from './features/game.features'
import userReducer from './features/user.features'

export default configureStore({
    reducer: {
        games: gameReducer,
        users: userReducer
    }
})