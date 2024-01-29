import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IResponse } from '../../interface/Response';

import { auth, getLogin, getRanking, getUser, newUser, rankingLocation, rankingUser, updateAllCategory, updateCategory } from '../actions/user.actions';
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

        builder.addCase(experienceGame.pending, (state) => {
            state.loading = true
        })
        builder.addCase(experienceGame.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(rankingLocation.pending, (state) => {
            state.loading = true
        })
        builder.addCase(rankingLocation.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(rankingUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(rankingUser.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(updateCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateCategory.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(updateAllCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateAllCategory.fulfilled, (state) => {
            state.loading = false
        })
        
    }
})

export const { loadingAction } = counterResponseSlice.actions

export default counterResponseSlice.reducer
