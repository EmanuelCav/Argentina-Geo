import { createAsyncThunk } from "@reduxjs/toolkit"

import { IAuthAction, IGetUserAction } from "../../interface/User";

import * as userApi from "../api/user.api"
import * as gamesApi from "../api/game.api";

import { firstTimeAction, getUserAction, loginAuthAction, usersAction } from "../features/user.features";
import { gamesAction } from "../features/game.features";
import { RankingActionProps, StackNavigation } from "../../types/props.types";

export const auth = createAsyncThunk('users/login', async (userData: IAuthAction, { dispatch }) => {

    try {
        const resLogin = await userApi.loginApi(userData.userData)

        const resGames = await gamesApi.gamesApi(resLogin.data.token)

        dispatch(loginAuthAction(resLogin.data))
        dispatch(gamesAction(resGames.data))

        userData.setIsAuth(false)
        userData.navigation.navigate('Home')

        return resLogin.data

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
        console.log(error);
    }

})

export const newUser = createAsyncThunk("users/newUser", async (navigation: StackNavigation, { dispatch }) => {

    try {

        const resFirst = await userApi.firstTimeApi()
        const resUsers = await userApi.usersApi("total", resFirst.data.token)

        dispatch(firstTimeAction(resFirst.data))
        dispatch(usersAction(resUsers.data))

        navigation.navigate('Home')

        return resFirst.data

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
        console.log(error);
    }

})