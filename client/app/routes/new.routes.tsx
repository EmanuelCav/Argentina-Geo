import { useEffect, useState } from "react";
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import NewUser from "../components/settings/newUser";
import Auth from "../components/settings/components/auth";

import { IReducer } from "../interface/Reducer";
import { StackNavigation } from "../types/props.types";

import { newStyles } from '../styles/settings.styles'

import { selector } from "../helper/selector";
import { getUserData } from "../helper/storage";
import { loadingAction } from "../server/features/response.features";
import { getLogin, newUser } from "../server/actions/user.actions";

const New = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    // const [isAuth, setIsAuth] = useState<boolean>(false)

    useEffect(() => {

        (async () => {

            await getUserData()

            if (users.isLoggedIn) {
                dispatch(getLogin({
                    navigation,
                    users
                }) as any)
                return
            }

            dispatch(newUser(navigation) as any)

            // dispatch(loadingAction(true))

            // setTimeout(() => {
            //     dispatch(loadingAction(false))
            // }, 2000);

        })()

    }, [])

    // useEffect(() => {
    // }, [isAuth])

    return (
        <>
        </>
        // <View style={newStyles.containerNew}>
        //     {
        //         isAuth && <Auth navigation={navigation} setIsAuth={setIsAuth} dispatch={dispatch} />
        //     }
        //     <NewUser navigation={navigation} setIsAuth={setIsAuth} dispatch={dispatch} />
        // </View>
    )
}

export default New