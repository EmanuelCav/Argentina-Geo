import { useEffect } from "react";
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from "react-redux";

import UserRank from "../components/ranking/userRank";

import { usersApi } from "../server/api/user.api";
import { usersAction } from "../server/features/user.features";

import { rankingStyles } from "../styles/home.styles";

import { IReducer } from "../interface/Reducer";
import { IUser } from "../interface/User";

import { selector } from "../helper/selector";

const Ranking = () => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const getData = async () => {

        try {
            const { data } = await usersApi(users.user.token)
            dispatch(usersAction(data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [dispatch])

    return (
        <View style={rankingStyles.containerRanking}>
            <Text style={rankingStyles.headerRanking}>CLASIFICACIÓN</Text>
            <View style={rankingStyles.usersRanking}>
                {
                    users.users.map((user: IUser) => {
                        return <UserRank user={user} key={user._id} />
                    })
                }
            </View>
        </View>
    )
}

export default Ranking