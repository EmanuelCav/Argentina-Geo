import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { useSelector } from "react-redux";

import UserRank from "../components/ranking/UserRank";
import ButtonMenu from "../components/ButtonMenu";
import FilterRank from "../components/ranking/FilterRank";
import Profile from '../components/profile/Profile';
import LocationRank from '../components/ranking/LocationRank';

import { rankingStyles, homeStyles } from "../styles/home.styles";

import { IReducer } from "../interface/Reducer";
import { ILocationRank, IUser } from "../interface/User";
import { StackNavigation } from "../types/props.types";
import { DateRankType } from '../types/user.types';

import { selector } from "../helper/selector";

const Ranking = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const [rankData, setRankData] = useState<DateRankType>("total")
    const [isProfile, setIsProfile] = useState<boolean>(false)

    return (
        <View style={rankingStyles.containerRanking}>
            {
                isProfile && <Profile user={users} games={games.games} setIsProfile={setIsProfile} />
            }
            <View style={rankingStyles.rankingContain}>
                <View style={rankingStyles.containerScrollRanking}>
                    <FilterRank users={users} setRankData={setRankData} rankData={rankData} />
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
                                                            rankData={rankData} setIsProfile={setIsProfile} key={user._id} />
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
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Regresar" redirect={() => navigation.navigate('Home')} isAccept={true} disabled={false} />
                </View>
            </View>
        </View >
    )
}

export default Ranking