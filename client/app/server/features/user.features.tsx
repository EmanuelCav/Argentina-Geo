import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ICounterUser, IUser } from '../../interface/User'

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
        }
    }
})

export const { usersAction, getUserAction } = counterGameSlice.actions

export default counterGameSlice.reducer