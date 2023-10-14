import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { useSelector } from "react-redux";

import UserRank from "../components/ranking/userRank";
import ButtonMenu from "../components/buttonMenu";
import FilterRank from "../components/ranking/filterRank";
import Profile from '../components/profile/profile';

import { rankingStyles, homeStyles } from "../styles/home.styles";

import { IReducer } from "../interface/Reducer";
import { IUser } from "../interface/User";
import { StackNavigation } from "../types/props.types";

import { selector } from "../helper/selector";

const Ranking = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const [rankData, setRankData] = useState("total")
    const [isProfile, setIsProfile] = useState<boolean>(false)

    return (
        <View style={rankingStyles.containerRanking}>
            {
                isProfile && <Profile user={users} games={games.games} setIsProfile={setIsProfile} />
            }
            <View style={rankingStyles.rankingContain}>
                <View style={rankingStyles.containerScrollRanking}>
                    <FilterRank users={users} setRankData={setRankData} />
                    <ScrollView>
                        {
                            users.users.ranking?.length === 0 ? (
                                <Text style={rankingStyles.textNoUsers}>No hay usuarios en la clasificación</Text>
                            ) : (
                                <>
                                    {
                                        users.users.ranking!.map((user: IUser, index: number) => {
                                            return <UserRank user={user} users={users} index={index}
                                                rankData={rankData} setIsProfile={setIsProfile} key={user._id} />
                                        })
                                    }
                                </>
                            )
                        }
                    </ScrollView>
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Aceptar" redirect={() => navigation.navigate('Home')} isAccept={true} isCategory={false} />
                </View>
            </View>
        </View >
    )
}

export default Ranking