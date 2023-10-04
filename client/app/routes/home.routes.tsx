import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from "react-redux";

import User from '../components/home/user'
import Options from '../components/home/options'
import Profile from '../components/profile/profile';

import { gamesApi } from '../server/api/game.api'
import { firstTimeApi, loginApi, usersApi } from '../server/api/user.api'
import { firstTimeAction, loginAction, usersAction } from '../server/features/user.features'
import { gamesAction } from '../server/features/game.features'

import { StackNavigation } from '../types/props.types'
import { IReducer } from '../interface/Reducer';

import { homeStyles } from "../styles/home.styles";

import { selector } from '../helper/selector';

const Home = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const dispatch = useDispatch()

    const [isProfile, setIsProfile] = useState<boolean>(false)

    const getData = async () => {

        try {
            const { data } = await gamesApi(users.user.token)
            dispatch(gamesAction(data))
        } catch (error) {
            console.log(error);
        }
    }

    const getUsers = async () => {

        try {
            const { data } = await usersApi(users.user.token)
            dispatch(usersAction(data))
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

    const getLoginData = async () => {

        try {
            const { data } = await loginApi(
                {
                    nickname: users.user.user.nickname,
                    password: users.user.user.password
                }
            )
            dispatch(loginAction(data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        if (users.isLoggedIn) {
            getLoginData()
            getUsers()
            getData()
        } else {
            generateUserData()
        }

    }, [dispatch, users.isLoggedIn])

    useEffect(() => {
    }, [isProfile, users.users])

    return (
        <View style={homeStyles.containerHome} >
            {
                isProfile && <Profile user={users} games={games.games} setIsProfile={setIsProfile} />
            }
            {
                users.isLoggedIn && <User user={users.user.user} users={users.users} games={games.games} />
            }
            <Options navigation={navigation} setIsProfile={setIsProfile} user={users} />
        </View>
    )
}

export default Home