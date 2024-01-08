import { createAsyncThunk } from "@reduxjs/toolkit"

import { IAuthAction, IGetUserAction } from "../../interface/User";

import * as userApi from "../api/user.api"
import * as gamesApi from "../api/game.api";

import { firstTimeAction, getUserAction, loginAction, loginAuthAction, updateOptionsAction, usersAction } from "../features/user.features";
import { gamesAction } from "../features/game.features";
import { RankingActionProps, UnlockCategoryProps } from "../../types/props.types";

export const auth = createAsyncThunk('users/login', async (userData: IAuthAction, { dispatch }) => {

    try {

        const resLogin = await userApi.loginApi(userData.userData)
        dispatch(loginAuthAction(resLogin.data))

        const resUsers = await userApi.usersApi("total", resLogin.data.token)
        dispatch(usersAction(resUsers.data))

        const resGames = await gamesApi.gamesApi(resLogin.data.token)
        dispatch(gamesAction(resGames.data))

        userData.setIsAuth(false)
        userData.navigation.navigate('Home')

    } catch (error: any) {
        userData.setUserData({
            nickname: "",
            password: ""
        })
        userData.setMessage(error.response.data.message)
    }
})

export const getUser = createAsyncThunk("users/getUser", async (userData: IGetUserAction, { dispatch }) => {

    try {

        const { data } = await userApi.userApi(userData.id, userData.user.user.token)

        dispatch(getUserAction(data))

        userData.setIsProfile(true)

    } catch (error) {
        userData.setIsProfile(true)
    }

})

export const newUser = createAsyncThunk("users/newUser", async (_, { dispatch }) => {

    try {

        const resFirst = await userApi.firstTimeApi()
        dispatch(firstTimeAction(resFirst.data))

        const resUsers = await userApi.usersApi("total", resFirst.data.token)
        dispatch(usersAction(resUsers.data))

    } catch (error) {
        console.log(error);
    }

})

export const getRanking = createAsyncThunk('users/ranking', async (rankingData: RankingActionProps, { dispatch }) => {

    try {

        const { data } = await userApi.usersApi("total", rankingData.user.user.token)

        dispatch(usersAction(data))

        rankingData.navigation.navigate("Ranking")

    } catch (error) {
        rankingData.navigation.navigate("Ranking")
    }

})

export const getLogin = createAsyncThunk('/users/getLogin', async (id: string, { dispatch }) => {

    try {

        const { data } = await userApi.getLoginApi(id)
        dispatch(loginAction(data))

        const resUsers = await userApi.usersApi("total", data.token)
        dispatch(usersAction(resUsers.data))

        const resGames = await gamesApi.gamesApi(data.token)
        dispatch(gamesAction(resGames.data))


    } catch (error) {
        console.log(error);
    }

})

export const unlockCategory = createAsyncThunk('/users/unlock', async (userData: UnlockCategoryProps, { dispatch }) => {

    try {

        const { data } = await userApi.unlockCategoryApi(userData.id, userData.token)
        dispatch(updateOptionsAction(data))

    } catch (error) {
        console.log(error);
    }

})