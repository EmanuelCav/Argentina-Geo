import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "@react-native-community/netinfo";

import User from '../components/home/user'
import Options from '../components/home/options'
import Profile from '../components/profile/profile';
import Network from '../components/response/network';

import { gamesApi } from '../server/api/game.api'
import { getDateExperienceApi, usersApi } from '../server/api/user.api'
import { gamesAction } from '../server/features/game.features'
import { getLogin, newUser } from '../server/actions/user.actions';

import { StackNavigation } from '../types/props.types'
import { IReducer } from '../interface/Reducer';

import { homeStyles } from "../styles/home.styles";

import { selector } from '../helper/selector';
import { isNewDate } from '../helper/time';
import { usersAction } from '../server/features/user.features';

const Home = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const dispatch = useDispatch()

    const [isProfile, setIsProfile] = useState<boolean>(false)
    const [isGetLoggedIn, setIsGetLoggedIn] = useState<boolean>(false)
    const [isInternet, setIsInternet] = useState<boolean>(true)
    const [isConnection, setIsConnection] = useState<boolean | null>(true)
    const [isChangeView, setIsChangeView] = useState<boolean>(false)

    const getGames = async () => {
        const { data } = await gamesApi(users.user.token)
        dispatch(gamesAction(data))
    }

    const getUsers = async () => {
        const { data } = await usersApi("total", users.user.token)
        dispatch(usersAction(data))

    }

    const getNewDate = async () => {
        try {
            await getDateExperienceApi(users.user.token)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetch().then(conn => conn).then(state => setIsConnection(state.isConnected));
    }, [isConnection, isProfile, isChangeView])

    useEffect(() => {
        if (isConnection) {
            getUsers()
        }
    }, [])

    useEffect(() => {

        if (isConnection) {
            if (users.isLoggedIn) {

                dispatch(getLogin(users.user.user._id) as any)
                getGames()
                
                if(isNewDate(new Date(new Date().setHours(new Date().getHours() - 3)).toISOString().split("T")[0], users)) {
                    getNewDate()
                }

                setIsGetLoggedIn(true)

                return

            }

            dispatch(newUser() as any)

        }

    }, [dispatch, users.isLoggedIn])

    return (
        <View style={homeStyles.containerHome} >
            {
                !isConnection && isInternet && <Network firstTime={!users.isLoggedIn} setIsInternet={setIsInternet} />
            }
            {
                users.isLoggedIn && isGetLoggedIn && (
                    <>
                        {
                            isProfile && <Profile user={users} games={games.games} setIsProfile={setIsProfile} isConnection={isConnection} />
                        }
                        <User user={users.user.user} users={users.users} />
                        <Options navigation={navigation} setIsProfile={setIsProfile} user={users} isConnection={isConnection}
                            setIsChangeView={setIsChangeView} isChangeView={isChangeView} />
                    </>
                )
            }
        </View>
    )
}

export default Home