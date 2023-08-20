import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ICounterGame, IGame } from '../../interface/Game'

const initialState: ICounterGame = {
    games: [],
    game: {}
}

const counterGameSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        gamesAction: (state, action: PayloadAction<IGame[]>) => {
            state.games = action.payload
        },
        getGameAction: (state, action: PayloadAction<IGame>) => {
            state.game = action.payload
        },
        createGameAction: (state, action: PayloadAction<IGame>) => {
            state.games = [...state.games, action.payload]
        }
    }
})

export const { gamesAction, getGameAction, createGameAction } = counterGameSlice.actions

export default counterGameSlice.reducer