import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';

import { UserRankingProps } from "../../types/props.types";

import { getUser } from "../../server/actions/user.actions";

import { rankingStyles } from "../../styles/home.styles";

const UserRank = ({ index, user, users, rankData, setIsProfile, isConnection }: UserRankingProps) => {

    const dispatch = useDispatch()

    const showProfile = () => {
        if(isConnection) {
            dispatch(getUser({
                id: user._id,
                user: users,
                setIsProfile
            }) as any)
        }
    }

    const pointsRank = () => {
        if (rankData === "total") {
            return user.points.total
        }

        if (rankData === "year") {
            return user.points.year
        }

        if (rankData === "month") {
            return user.points.month
        }

        if (rankData === "day") {
            return user.points.day
        }

        return user.points.total
    }

    return (
        <TouchableOpacity  style={users.user.user._id === user._id ? rankingStyles.userRankingMe : rankingStyles.userRanking} 
        onPress={showProfile}>
            <View style={rankingStyles.containerUserRank}>
                <View style={rankingStyles.topUser}>
                    <Text style={rankingStyles.topUserRank}>{index + 1}</Text>
                    <Text style={rankingStyles.infoUserRank}>{user.nickname}</Text>
                </View>
                <View style={rankingStyles.containExpUser}>
                    <Text style={rankingStyles.pointsUserRank}>{pointsRank()}xp</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UserRank