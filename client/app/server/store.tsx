import { configureStore } from '@reduxjs/toolkit'

import gameReducer from './features/game.features'

export default configureStore({
    reducer: {
        games: gameReducer
    }
})