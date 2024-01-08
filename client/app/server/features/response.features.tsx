import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IResponse } from '../../interface/Response';

import { auth, getLogin, getRanking, getUser, newUser, unlockCategory } from '../actions/user.actions';
import { experienceGame, game } from '../actions/game.actions';

const initialState: IResponse = {
    loading: false
}

const counterResponseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {
        loadingAction: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(auth.pending, (state) => {
            state.loading = true
        })
        builder.addCase(auth.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(game.pending, (state) => {
            state.loading = true
        })
        builder.addCase(game.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(getUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUser.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(newUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(newUser.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(getRanking.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getRanking.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(getLogin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getLogin.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(unlockCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(unlockCategory.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(experienceGame.pending, (state) => {
            state.loading = true
        })
        builder.addCase(experienceGame.fulfilled, (state) => {
            state.loading = false
        })
    }
})

export const { loadingAction } = counterResponseSlice.actions

export default counterResponseSlice.reducer
