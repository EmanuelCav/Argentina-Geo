import { useState } from 'react';
import { View, ScrollView } from 'react-native'
import { useSelector } from "react-redux";

import UserRank from "../components/ranking/userRank";
import ButtonMenu from "../components/buttonMenu";
import FilterRank from "../components/ranking/filterRank";

import { rankingStyles, homeStyles } from "../styles/home.styles";

import { IReducer } from "../interface/Reducer";
import { IUser } from "../interface/User";
import { StackNavigation } from "../types/props.types";

import { selector } from "../helper/selector";

const Ranking = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const [rankData, setRankData] = useState("total")

    return (
        <View style={rankingStyles.containerRanking}>
            <View style={rankingStyles.rankingContain}>
                <View style={rankingStyles.containerScrollRanking}>
                    <FilterRank users={users} setRankData={setRankData} />
                    <ScrollView>
                        {
                            users.users.ranking!.map((user: IUser) => {
                                return <UserRank user={user} rankData={rankData} key={user._id} />
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