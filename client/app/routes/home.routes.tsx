import { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch } from "react-redux";

import User from '../components/home/user'
import Options from '../components/home/options'

import { gamesApi, categoriesApi } from '../server/api/game.api'
import { gamesAction, categoriesAction } from '../server/features/game.features'

import { userApi } from '../server/api/user.api'
import { getUserAction } from '../server/features/user.features'

import { StackNavigation } from '../types/props.types'

import { homeStyles } from "../styles/home.styles";

const Home = ({ navigation }: { navigation: StackNavigation }) => {

    const dispatch = useDispatch()

    const getData = async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGU0YTFmNzExNWJmYWZjNTM1ZWFlNCIsImlhdCI6MTY5MjI5MzEyOSwiZXhwIjoxNjk0ODg1MTI5fQ.SUJFgqUomvhsvE1EPLSx9rTrAUbJa39z7fWUqYESHO8"

        try {
            const { data } = await gamesApi(token)
            dispatch(gamesAction(data))
        } catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGU0YTFmNzExNWJmYWZjNTM1ZWFlNCIsImlhdCI6MTY5MjI5MzEyOSwiZXhwIjoxNjk0ODg1MTI5fQ.SUJFgqUomvhsvE1EPLSx9rTrAUbJa39z7fWUqYESHO8"

        try {
            const { data } = await categoriesApi(token)
            dispatch(categoriesAction(data))
        } catch (error) {
            console.log(error);
        }
    }

    const getUser = async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGU0YTFmNzExNWJmYWZjNTM1ZWFlNCIsImlhdCI6MTY5MjI5MzEyOSwiZXhwIjoxNjk0ODg1MTI5fQ.SUJFgqUomvhsvE1EPLSx9rTrAUbJa39z7fWUqYESHO8"

        try {
            const { data } = await userApi('64de4a1f7115bfafc535eae4', token)
            dispatch(getUserAction(data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
        getData()
        getCategories()
    }, [dispatch])

    return (
        <View style={homeStyles.containerHome} >
            <User />
            <Options navigation={navigation} />
        </View>
    )
}

export default Home