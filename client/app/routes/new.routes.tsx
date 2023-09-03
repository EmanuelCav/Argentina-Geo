import { useEffect, useState } from "react";
import { View } from 'react-native'
import { useSelector } from 'react-redux'

import NewUser from "../components/settings/newUser";
import Auth from "../components/settings/components/auth";

import { IReducer } from "../interface/Reducer";
import { StackNavigation } from "../types/props.types";

import { newStyles } from '../styles/settings.styles'

import { selector } from "../helper/selector";

const New = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const [isAuth, setIsAuth] = useState<boolean>(false)

    useEffect(() => {

        (async () => {

            if (users.isLoggedIn) {
                navigation.navigate('Home')
            }

        })()

    }, [])

    useEffect(() => {
    }, [isAuth])

    return (
        <View style={newStyles.containerNew}>
            {
                isAuth && <Auth setIsAuth={setIsAuth} />
            }
            <NewUser navigation={navigation} setIsAuth={setIsAuth} />
        </View>
    )
}

export default New