import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "@react-native-community/netinfo";

import User from '../components/home/User'
import Options from '../components/home/Options'
import Profile from '../components/profile/Profile';
import UserNoConnection from '../components/home/UserNoConnection';

import { gamesApi } from '../server/api/game.api'
import { usersApi } from '../server/api/user.api'
import { gamesAction } from '../server/features/game.features'
import { getLogin, newUser } from '../server/actions/user.actions';
import { usersAction } from '../server/features/user.features';

import { StackNavigation } from '../types/props.types'
import { IReducer } from '../interface/Reducer';

import { homeStyles } from "../styles/home.styles";

import { selector } from '../helper/selector';

const Home = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const dispatch = useDispatch()

    const [isProfile, setIsProfile] = useState<boolean>(false)
    const [isConnection, setIsConnection] = useState<boolean | null>(true)
    const [isChangeView, setIsChangeView] = useState<boolean>(false)

    const getGames = async () => {

        try {

            const { data } = await gamesApi(users.user.token)
            dispatch(gamesAction(data))

        } catch (error) {
            console.log(error);
        }

    }

    const getUsers = async () => {

        try {

            const { data } = await usersApi("total", users.user.token)
            dispatch(usersAction(data))

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetch().then(conn => conn).then(state => setIsConnection(state.isConnected));
    }, [isConnection, isProfile, isChangeView])

    useEffect(() => {
        if (isConnection && users.isLoggedIn) {
            getUsers()
        }
    }, [])

    useEffect(() => {
        if (isConnection) {
            if (users.isLoggedIn) {

                dispatch(getLogin(users.user.user._id) as any)
                getGames()

                return

            }

            dispatch(newUser() as any)

        }

    }, [dispatch, users.isLoggedIn])

    return (
        <View style={homeStyles.containerHome} >
            {
                isConnection ? (
                    <>
                        {
                            users.isLoggedIn &&
                            <>
                                {
                                    isProfile && <Profile user={users} games={games.games} setIsProfile={setIsProfile} />
                                }
                                <User user={users.user.user} users={users.users} />
                                <Options navigation={navigation} setIsProfile={setIsProfile} user={users} isConnection={isConnection}
                                    setIsChangeView={setIsChangeView} isChangeView={isChangeView} />
                            </>
                        }
                    </>
                ) : (
                    <>
                        <UserNoConnection />
                        <Options navigation={navigation} setIsProfile={setIsProfile} user={users} isConnection={isConnection}
                            setIsChangeView={setIsChangeView} isChangeView={isChangeView} />
                    </>
                )
            }
        </View >
    )
}

export default Home