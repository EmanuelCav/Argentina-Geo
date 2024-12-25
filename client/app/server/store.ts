import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EXPO_KEY, NODE_ENV } from '@env';

import userReducer from './features/user.features'
import responseReducer from './features/response.features'

const reducers = combineReducers({
    users: userReducer,
    response: responseReducer
})

const persistedReducers = persistReducer({
    key: `${EXPO_KEY}`,
    version: 1,
    storage: AsyncStorage
}, reducers)

const store = configureStore({
    reducer: persistedReducers,
    devTools: NODE_ENV !== 'production',
    middleware: [thunk]
})

export default store