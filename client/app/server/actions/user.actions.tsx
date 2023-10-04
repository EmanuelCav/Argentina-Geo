import { createAsyncThunk } from "@reduxjs/toolkit"

import { IAuthAction, IGetUserAction } from "../../interface/User";
import { UserReducerType } from "../../types/user.types";

import * as userApi from "../api/user.api"

import { getUserAction, loginAuthAction } from "../features/user.features";

export const auth = createAsyncThunk('users/login', async (userData: IAuthAction, { dispatch }) => {

    try {
        const { data } = await userApi.loginApi(userData.userData)
        
        dispatch(loginAuthAction(data))

        userData.setIsAuth(false)
        userData.navigation.navigate('Home')

        return data

    } catch (error) {
        console.log(error);
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