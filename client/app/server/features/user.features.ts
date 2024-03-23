import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ICounterUser, ILocationRank, IUser, IUserReducer, IUsersRank } from '../../interface/User'

const initialState: ICounterUser = {
    user: {},
    isLoggedIn: false,
    users: {},
    profile: {}
}

const counterUserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersAction: (state, action: PayloadAction<IUsersRank>) => {
            state.users = action.payload
            state.users.locationRanking = []
        },
        getUserAction: (state, action: PayloadAction<IUser>) => {
            state.profile = action.payload
        },
        loginAuthAction: (state, action: PayloadAction<IUserReducer>) => {
            state.user = action.payload
            state.isLoggedIn = true
            state.profile = action.payload.user
        },
        loginAction: (state, action: PayloadAction<IUserReducer>) => {
            state.user = action.payload
            state.isLoggedIn = true
            state.profile = action.payload.user
        },
        firstTimeAction: (state, action: PayloadAction<IUserReducer>) => {
            state.user = action.payload
            state.isLoggedIn = true
            state.profile = action.payload.user
        },
        updateOptionsAction: (state, action: PayloadAction<IUser>) => {
            state.user.user = action.payload
        },
        locationRankAction: (state, action: PayloadAction<ILocationRank[]>) => {
            state.users.ranking = []
            state.users.locationRanking = action.payload
        }
    }
})

export const { usersAction, getUserAction, loginAuthAction, loginAction, firstTimeAction, updateOptionsAction, locationRankAction } = counterUserSlice.actions

export default counterUserSlice.reducer