import { useEffect } from "react";
import { Dimensions, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { IReducer } from "../interface/Reducer";
import { StackNavigation } from "../types/props.types";

import { selector } from "../helper/selector";
import { getUserData } from "../helper/storage";

import { getLogin, newUser } from "../server/actions/user.actions";

const New = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

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

        })()

    }, [])

    return (
        <View style={{ backgroundColor: '#9edefa', width: Dimensions.get("window").width, height: Dimensions.get("window").height }} />
    )
}

export default New