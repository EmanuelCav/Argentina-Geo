import { View, Text } from "react-native";

import { UserRankingProps } from "../../types/props.types";

import { rankingStyles } from "../../styles/home.styles";

const UserRank = ({ user, rankData }: UserRankingProps) => {

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
        <View style={rankingStyles.userRanking}>
            <Text style={rankingStyles.infoUserRank}>{user.nickname}</Text>
            <Text style={rankingStyles.infoUserRank}>{pointsRank()} xp</Text>
        </View>
    )
}

export default UserRank