import { createAsyncThunk } from "@reduxjs/toolkit";

import { IExperienceGame, IGameGenerate } from "../../interface/Game";

import { createGameApi } from "../api/game.api";
import { createGameAction, getGameAction } from "../features/game.features";
import { getDateExperienceApi, updateExperienceApi, usersApi } from "../api/user.api";
import { updateOptionsAction, usersAction } from "../features/user.features";

import { getTime, isNewDate } from "../../helper/time";

export const game = createAsyncThunk('game/generateGame', async (gameData: IGameGenerate, { dispatch }) => {

    try {

        const { data } = await createGameApi(gameData.token)

        dispatch(createGameAction(data))
        dispatch(getGameAction(data))

        gameData.navigation.navigate('Playing', {
            isConnection: true,
            questionsWC: []
        })

    } catch (error: any) {
        gameData.setMessage(error.response.data.message)
    }

})

export const experienceGame = createAsyncThunk('game/experienceGame', async (gameData: IExperienceGame, { dispatch }) => {

    try {

        const time = await getTime()

        if(isNewDate(time, gameData.users)) {
            await getDateExperienceApi(gameData.user.token)
        }

        const { data } = await updateExperienceApi(gameData.user.user.level._id, gameData.pointsData, gameData.user.token)
        dispatch(updateOptionsAction(data))

        const res = await usersApi("total", gameData.user.token)
        dispatch(usersAction(res.data))

    } catch (error) {
        console.log(error);
    }

})