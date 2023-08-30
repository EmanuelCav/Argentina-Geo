import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ICounterUser, IUser, IUserReducer } from '../../interface/User'

const initialState: ICounterUser = {
    user: {
        token: "",
        user: {}
    },
    isLoggedIn: false,
    users: [],
    profile: {}
}

const counterGameSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersAction: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload
        },
        getUserAction: (state, action: PayloadAction<IUser>) => {
            state.profile = action.payload
        },
        loginAction: (state, action: PayloadAction<IUserReducer>) => {
            state.user = action.payload
            state.isLoggedIn = true
            state.users = []
            state.profile = action.payload.user
        },
        firstTimeAction: (state, action: PayloadAction<IUserReducer>) => {
            state.user = action.payload
            state.isLoggedIn = true
        },
        updateOptionsAction: (state, action: PayloadAction<IUser>) => {
            state.user.user = action.payload
        }
    }
})

export const { usersAction, getUserAction, loginAction, firstTimeAction, updateOptionsAction } = counterGameSlice.actions

export default counterGameSlice.reducer