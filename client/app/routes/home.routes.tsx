import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Banner from '../components/general/Banner';
import User from '../components/home/User'
import Menu from '../components/home/Menu'
import UserNoConnection from '../components/home/UserNoConnection';
import Container from '../Container';

import { usersApi } from '../server/api/user.api'
import { getLogin, newUser } from '../server/actions/user.actions';
import { usersAction } from '../server/features/user.features';

import { StackNavigation } from '../types/props.types'
import { IReducer } from '../interface/Reducer';

import { selector } from '../helper/selector';

import { useConnection } from '../hooks/useConnection';

const Home = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()
    const isConnection = useConnection()

    const getUsers = async () => {

        try {

            const { data } = await usersApi("total")
            dispatch(usersAction(data))

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (isConnection) {
            getUsers()
        }
    }, [])

    useEffect(() => {
        if (isConnection) {
            (async () => {
                const key = await AsyncStorage.getItem(`userId`)
                
                if (key) {
                    dispatch(getLogin(key) as any)
                } else {
                    dispatch(newUser() as any)
                }
            })()
        }
    }, [dispatch])

    return (
        <Container>
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
                                <Menu navigation={navigation} user={users} isConnection={isConnection} />
                            </>
                        }
                    </>
                ) : (
                    <>
                        <UserNoConnection />
                        <Menu navigation={navigation} user={users} isConnection={isConnection}/>
                    </>
                )
            }
        </Container>
    )
}

export default Home