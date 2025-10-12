import { createAsyncThunk } from "@reduxjs/toolkit";

import { IExperienceGame, IGameGenerate } from "../../interface/Game";

import { createGameApi } from "../api/game.api";
import * as userApi from "../api/user.api";
import * as userFeatures from "../features/user.features";

export const game = createAsyncThunk('game/generateGame', async (gameData: IGameGenerate) => {

    try {

        const { data } = await createGameApi(gameData.token)

        gameData.navigation.navigate('Playing', {
            isConnection: true,
            questionsWC: data
        })

    } catch (error: any) {
        gameData.setMessage(error.response.data.message)
    }

})

export const experienceGame = createAsyncThunk('game/experienceGame', async (gameData: IExperienceGame, { dispatch }) => {

    try {

        const { data } = await userApi.updateExperienceApi(gameData.pointsData, gameData.user.token!)
        dispatch(userFeatures.updateOptionsAction(data))

        const res = await userApi.usersApi("total")
        dispatch(userFeatures.usersAction(res.data))

    } catch (error) {
        console.log(error);
    }

})
