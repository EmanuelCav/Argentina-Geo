import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IResponse } from '../../interface/Response';

import * as userAction from '../actions/user.actions';
import * as gameAction from '../actions/game.actions';

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
        builder.addCase(userAction.auth.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.auth.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.auth.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(gameAction.game.pending, (state) => {
            state.loading = true
        })
        builder.addCase(gameAction.game.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(gameAction.game.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.getUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.getUser.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.getUser.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.newUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.newUser.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.newUser.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.getRanking.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.getRanking.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.getRanking.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.getLogin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.getLogin.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.getLogin.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(gameAction.experienceGame.pending, (state) => {
            state.loading = true
        })
        builder.addCase(gameAction.experienceGame.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(gameAction.experienceGame.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.rankingLocation.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.rankingLocation.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.rankingLocation.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.rankingUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.rankingUser.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.rankingUser.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.updateCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.updateCategory.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.updateCategory.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.updateOptions.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.updateOptions.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.updateOptions.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.updateAllCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.updateAllCategory.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.updateAllCategory.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.getTents.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.getTents.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.getTents.rejected, (state) => {
            state.loading = false
        })
        
    }
})

export const { loadingAction } = counterResponseSlice.actions

export default counterResponseSlice.reducer
