import { createAsyncThunk } from "@reduxjs/toolkit";

import { IGameGenerate } from "../../interface/Game";

import { createGameApi } from "../api/game.api";
import { createGameAction, getGameAction } from "../features/game.features";

export const game = createAsyncThunk('game/generateGame', async (gameData: IGameGenerate, { dispatch }) => {

    try {

        const { data } = await createGameApi(gameData.token)
        
        dispatch(createGameAction(data))
        dispatch(getGameAction(data))

        gameData.navigation.navigate('Playing')

        return data

    } catch (error: any) {
        gameData.setMessage(error.response.data.message)
    }

})