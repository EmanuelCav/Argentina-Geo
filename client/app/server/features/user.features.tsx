import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ICounterUser, IUser } from '../../interface/User'

const initialState: ICounterUser = {
    users: [],
    user: {}
}

const counterGameSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersAction: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload
        }
    }
})

export const { usersAction } = counterGameSlice.actions

export default counterGameSlice.reducer