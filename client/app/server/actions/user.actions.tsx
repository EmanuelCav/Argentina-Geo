import { createAsyncThunk } from "@reduxjs/toolkit"

import { IAuthAction, IGetUserAction } from "../../interface/User";

import * as userApi from "../api/user.api"
import * as gamesApi from "../api/game.api";

import { getUserAction, loginAuthAction } from "../features/user.features";
import { gamesAction } from "../features/game.features";

export const auth = createAsyncThunk('users/login', async (userData: IAuthAction, { dispatch }) => {

    try {
        const { data } = await userApi.loginApi(userData.userData)

        const res = await gamesApi.gamesApi(data.token)

        dispatch(loginAuthAction(data))
        dispatch(gamesAction(res.data))

        userData.setIsAuth(false)
        userData.navigation.navigate('Home')

        return data

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

        const { data } = await userApi.userApi(userData.user.profile._id, userData.user.user.token)

        dispatch(getUserAction(data))

        userData.setIsProfile(true)

    } catch (error) {
        console.log(error);
    }

})