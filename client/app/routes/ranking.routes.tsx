import { useEffect } from "react";
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from "react-redux";

import { usersApi } from "../server/api/user.api";
import { usersAction } from "../server/features/user.features";

import { rankingStyles } from "../styles/home.styles";

import { IReducer } from "../interface/Reducer";
import { IUser } from "../interface/User";

import { selector } from "../helper/selector";
import UserRank from "../components/ranking/userRank";

const Ranking = () => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const getData = async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGU0YTFmNzExNWJmYWZjNTM1ZWFlNCIsImlhdCI6MTY5MjI5MzEyOSwiZXhwIjoxNjk0ODg1MTI5fQ.SUJFgqUomvhsvE1EPLSx9rTrAUbJa39z7fWUqYESHO8"

        try {
            const { data } = await usersApi(token)
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