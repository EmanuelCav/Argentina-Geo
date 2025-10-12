import { createAsyncThunk } from "@reduxjs/toolkit"

import * as userApi from "../api/user.api"

import * as ActionTypes from "../../types/action.types";

import * as userFeatures from "../features/user.features";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const auth = createAsyncThunk('users/login', async (userData: ActionTypes.AuthActionPropsType, { dispatch }) => {

    try {

        const resLogin = await userApi.loginApi(userData.userData)
        dispatch(userFeatures.loginAuthAction(resLogin.data))

        const resUsers = await userApi.usersApi("total")
        dispatch(userFeatures.usersAction(resUsers.data))

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

export const getUser = createAsyncThunk("users/getUser", async (userData: ActionTypes.GetUserActionPropsType, { dispatch }) => {

    try {

        const { data } = await userApi.userApi(userData.id, userData.user.user.token!)

        dispatch(userFeatures.getUserAction(data))

        userData.navigation.navigate('Profile')

    } catch (error) {
        userData.navigation.navigate('Home')
    }

})

export const newUser = createAsyncThunk("users/newUser", async (_, { dispatch }) => {

    try {

        const resFirst = await userApi.firstTimeApi()
        const resUsers = await userApi.usersApi("total")

        dispatch(userFeatures.firstTimeAction(resFirst.data))
        dispatch(userFeatures.usersAction(resUsers.data))

        await AsyncStorage.setItem("userId", resFirst.data.user._id)

    } catch (error) {
        console.log(error);
    }

})

export const getRanking = createAsyncThunk('users/ranking', async (rankingData: ActionTypes.GetRankingActionPropsType, { dispatch }) => {

    try {

        const { data } = await userApi.usersApi("total")

        dispatch(userFeatures.usersAction(data))

        rankingData.navigation.navigate("Ranking")

    } catch (error) {
        rankingData.navigation.navigate("Ranking")
    }

})

export const getLogin = createAsyncThunk('/users/getLogin', async (id: string, { dispatch }) => {

    try {

        const { data } = await userApi.getLoginApi(id)
        dispatch(userFeatures.loginAction(data))

    } catch (error) {
        console.log(error);
    }

})

export const rankingLocation = createAsyncThunk('ranking/location', async (locationData: ActionTypes.RankingLocationActionPropsType, { dispatch }) => {

    try {

        const { data } = await userApi.rankingLocationApi(locationData.positionRank, locationData.rankData, locationData.token)

        dispatch(userFeatures.locationRankAction(data))

    } catch (error) {
        console.log(error);
    }

})

export const rankingUser = createAsyncThunk('ranking/user', async (rankingUserData: ActionTypes.RankingUserActionPropsType, { dispatch }) => {

    try {

        const { data } = await userApi.usersApi(rankingUserData.rankData)

        dispatch(userFeatures.usersAction(data))

    } catch (error) {
        console.log(error);
    }

})

export const updateCategory = createAsyncThunk('users/category', async (userData: ActionTypes.UpdateCategoryActionPropsType, { dispatch }) => {

    try {

        const { data } = await userApi.updateCategoryApi(userData.id, userData.token)

        dispatch(userFeatures.updateOptionsAction(data))

    } catch (error) {
        console.log(error);
    }

})

export const updateOptions = createAsyncThunk('users/options', async (userData: ActionTypes.UpdateOptionsActionPropsType, { dispatch }) => {

    try {

        const { data } = await userApi.updateOptionsApi(userData.user.user?._id!, userData.optionsData, userData.user.token!)

        dispatch(userFeatures.updateOptionsAction(data))

        userData.navigation.navigate('Play')

    } catch (error) {
        console.log(error);
    }

})

export const updateAllCategory = createAsyncThunk('users/allcategory', async (userData: ActionTypes.UpdateAllCategoryActionPropsType, { dispatch }) => {

    try {

        const { data } = await userApi.updateAllCategoryApi({ query: userData.query }, userData.token)

        dispatch(userFeatures.updateOptionsAction(data))

    } catch (error) {
        console.log(error);
    }

})

export const getTents = createAsyncThunk('users/tent', async (userData: ActionTypes.GetTentActionPropsType) => {

    try {

        const { data } = await userApi.tentsApi(userData.token)

        userData.setTents(data)

    } catch (error) {
        console.log(error);
    }

})