import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from "react-redux";

import UserRank from "../components/ranking/UserRank";
import FilterRank from "../components/ranking/FilterRank";
import LocationRank from '../components/ranking/LocationRank';
import ButtonAccept from '../components/general/ButtonAccept';

import { IReducer } from "../interface/Reducer";
import { ILocationRank, IUser } from "../interface/User";
import { DateRankType, StackNavigation } from "../types/props.types";

import { rankingStyles } from '../styles/ranking.styles';
import { generalStyles } from '../styles/general.styles';

import { selector } from "../helper/selector";

const Ranking = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const [rankData, setRankData] = useState<DateRankType>("total")

    return (
        <View style={generalStyles.containerGeneral}>
            <View style={rankingStyles.rankingContain}>
                <FilterRank users={users} setRankData={setRankData} rankData={rankData} dispatch={dispatch} />
                <ScrollView>
                    {
                        users.users.locationRanking?.length === 0 ? (
                            <>
                                {
                                    users.users.ranking?.length === 0 ? (
                                        <Text style={rankingStyles.textNoUsers}>No hay usuarios en la clasificación</Text>
                                    ) : (
                                        <>
                                            {
                                                users.users.ranking!.map((user: IUser, index: number) => {
                                                    return <UserRank user={user} users={users} index={index}
                                                        rankData={rankData} key={user._id} navigation={navigation} />
                                                })
                                            }
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <>
                                {
                                    users.users.locationRanking!.map((location: ILocationRank, index: number) => {
                                        return <LocationRank location={location} index={index} key={index} />
                                    })
                                }
                            </>
                        )
                    }
                </ScrollView>
            </View>
            <ButtonAccept text="REGRESAR" func={() => navigation.navigate('Home')} isCategory={false} />
        </View >
    )
}

export default Ranking