import { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from "react-redux";

import User from '../components/home/user'
import Options from '../components/home/options'

import { gamesApi, categoriesApi } from '../server/api/game.api'
import { gamesAction, categoriesAction } from '../server/features/game.features'

import { firstTimeApi } from '../server/api/user.api'
import { firstTimeAction } from '../server/features/user.features'

import { StackNavigation } from '../types/props.types'
import { IReducer } from '../interface/Reducer';

import { homeStyles } from "../styles/home.styles";

import { getUserData } from '../helper/storage';
import { selector } from '../helper/selector';

const Home = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const getData = async () => {

        try {
            const { data } = await gamesApi(users.user.token)
            dispatch(gamesAction(data))
        } catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {

        try {
            const { data } = await categoriesApi(users.user.token)
            dispatch(categoriesAction(data))
        } catch (error) {
            console.log(error);
        }
    }

    const generateUserData = async () => {

        try {
            const { data } = await firstTimeApi()
            dispatch(firstTimeAction(data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        (async () => {
            try {

                const isUser = await getUserData()

                if (isUser) {
                    getData()
                    getCategories()
                } else {
                    generateUserData()
                }

            } catch (error) {
                console.log(error);
            }
        })();

    }, [dispatch, users.user])

    return (
        <View style={homeStyles.containerHome} >
            <User />
            <Options navigation={navigation} />
        </View>
    )
}

export default Home