import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "@react-native-community/netinfo";

import Banner from '../components/general/Banner';
import User from '../components/home/User'
import Menu from '../components/home/Menu'
import UserNoConnection from '../components/home/UserNoConnection';

import { usersApi } from '../server/api/user.api'
import { getLogin, newUser } from '../server/actions/user.actions';
import { usersAction } from '../server/features/user.features';

import { StackNavigation } from '../types/props.types'
import { IReducer } from '../interface/Reducer';

import { generalStyles } from '../styles/general.styles';

import { selector } from '../helper/selector';

const Home = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const [isConnection, setIsConnection] = useState<boolean>(true)
    const [isChangeView, setIsChangeView] = useState<boolean>(false)

    const getUsers = async () => {

        try {

            const { data } = await usersApi("total", users.user.token!)
            dispatch(usersAction(data))

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetch().then(conn => conn).then(state => setIsConnection(state.isConnected!));
    }, [isConnection, isChangeView])

    useEffect(() => {
        if (isConnection && users.isLoggedIn) {
            getUsers()
        }
    }, [])

    useEffect(() => {

        if (isConnection) {
            if (users.isLoggedIn) {

                dispatch(getLogin(users.user.user?._id!) as any)

                return

            }

            dispatch(newUser() as any)

        }

    }, [dispatch, users.isLoggedIn])

    return (
        <View style={generalStyles.containerGeneral} >
            {
                isConnection ? (
                    <>
                        {
                            users.isLoggedIn &&
                            <>
                                {
                                    users.user.user?.isAdd && <Banner />
                                }
                                <User user={users.user.user!} users={users.users} />
                                <Menu navigation={navigation} user={users} isConnection={isConnection}
                                    setIsChangeView={setIsChangeView} isChangeView={isChangeView} />
                            </>
                        }
                    </>
                ) : (
                    <>
                        <UserNoConnection />
                        <Menu navigation={navigation} user={users} isConnection={isConnection}
                            setIsChangeView={setIsChangeView} isChangeView={isChangeView} />
                    </>
                )
            }
        </View >
    )
}

export default Home