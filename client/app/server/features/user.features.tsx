import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ICounterUser, IUser } from '../../interface/User'
import { UserDataType } from '../../types/user.types'

const initialState: ICounterUser = {
    user: {},
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
        loginAction: (state, action: PayloadAction<UserDataType>) => {
            state.user = action.payload
            state.isLoggedIn = true,
            state.users = []
            state.profile = action.payload.user
        },
        firstTimeAction: (state, action: PayloadAction<UserDataType>) => {
            state.user = action.payload
            state.isLoggedIn = true
        }
    }
})

export const { usersAction, getUserAction, loginAction, firstTimeAction } = counterGameSlice.actions

export default counterGameSlice.reducer