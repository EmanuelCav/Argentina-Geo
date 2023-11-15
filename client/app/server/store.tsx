import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants';

import gameReducer from './features/game.features'
import userReducer from './features/user.features'
import responseReducer from './features/response.features'

const reducers = combineReducers({
    users: userReducer,
    games: gameReducer,
    response: responseReducer
})

const persistedReducers = persistReducer({
    key: `${Constants?.manifest?.extra?.key}`,
    version: 1,
    storage: AsyncStorage
}, reducers)

const store = configureStore({
    reducer: persistedReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export default store