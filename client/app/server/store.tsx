import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk';

import gameReducer from './features/game.features'
import userReducer from './features/user.features'
import responseReducer from './features/response.features'

const reducers = combineReducers({
    users: userReducer,
    games: gameReducer,
    response: responseReducer
})

const persistedReducers = persistReducer({
    key: `arrgeo-user-games`,
    version: 1,
    storage
}, reducers)

const store = configureStore({
    reducer: persistedReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export default store