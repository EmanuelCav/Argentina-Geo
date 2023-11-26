import { createAsyncThunk } from "@reduxjs/toolkit"

import { IAuthAction, IGetUserAction } from "../../interface/User";

import * as userApi from "../api/user.api"
import * as gamesApi from "../api/game.api";

import { firstTimeAction, getUserAction, loginAction, loginAuthAction, usersAction } from "../features/user.features";
import { gamesAction } from "../features/game.features";
import { RankingActionProps } from "../../types/props.types";
import { UserType } from "../../types/user.types";

export const auth = createAsyncThunk('users/login', async (userData: IAuthAction, { dispatch }) => {

    try {
        const resLogin = await userApi.loginApi(userData.userData)

        const resGames = await gamesApi.gamesApi(resLogin.data.token)

        dispatch(loginAuthAction(resLogin.data))
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
        console.log(error);
    }

})

export const newUser = createAsyncThunk("users/newUser", async (_, { dispatch }) => {

    try {

        const resFirst = await userApi.firstTimeApi()
        const resUsers = await userApi.usersApi("total", resFirst.data.token)

        dispatch(firstTimeAction(resFirst.data))
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
        console.log(error);
    }

})

export const getLogin = createAsyncThunk('/users/getLogin', async (users: UserType, { dispatch }) => {

    try {

        const { data } = await userApi.loginApi(
            {
                nickname: users.user.user.nickname,
                password: users.user.user.password
            }
        )

        dispatch(loginAction(data))

    } catch (error) {
        console.log(error);
    }

})