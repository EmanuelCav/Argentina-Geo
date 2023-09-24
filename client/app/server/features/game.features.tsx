import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ICategories, ICounterGame, IGame } from '../../interface/Game'

const initialState: ICounterGame = {
    games: [],
    game: {},
    categories: []
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
        },
        categoriesAction: (state, action: PayloadAction<ICategories[]>) => {
            state.categories = action.payload
        }
    }
})

export const { gamesAction, getGameAction, createGameAction, categoriesAction } = counterGameSlice.actions

export default counterGameSlice.reducer