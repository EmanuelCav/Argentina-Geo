import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EXPO_KEY, NODE_ENV } from '@env'

import userReducer from './features/user.features'
import responseReducer from './features/response.features'

const rootReducer = combineReducers({
    users: userReducer,
    response: responseReducer
})

const persistConfig = {
    key: `${EXPO_KEY}`.trim(),
    version: 1,
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: NODE_ENV.trim() !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)

export default store
