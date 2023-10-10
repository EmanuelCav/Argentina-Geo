import { useEffect } from "react";
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from "react-redux";

import UserRank from "../components/ranking/userRank";
import ButtonMenu from "../components/buttonMenu";

import { usersApi } from "../server/api/user.api";
import { usersAction } from "../server/features/user.features";

import { rankingStyles, homeStyles } from "../styles/home.styles";

import { IReducer } from "../interface/Reducer";
import { IUser } from "../interface/User";
import { StackNavigation } from "../types/props.types";

import { selector } from "../helper/selector";

const Ranking = ({ navigation }: { navigation: StackNavigation }) => {

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
            <View style={rankingStyles.rankingContain}>
                <View style={rankingStyles.containerScrollRanking}>
                    <ScrollView>
                        {
                            users.users.map((user: IUser) => {
                                return <UserRank user={user} key={user._id} />
                            })
                        }
                    </ScrollView>
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Aceptar" redirect={() => navigation.navigate('Home')} isAccept={true} isCategory={false} />
                </View>
            </View>
        </View>
    )
}

export default Ranking