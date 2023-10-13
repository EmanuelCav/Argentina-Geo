import { Text, Pressable } from "react-native";
import { useDispatch } from 'react-redux';

import { UserRankingProps } from "../../types/props.types";

import { getUser } from "../../server/actions/user.actions";

import { rankingStyles } from "../../styles/home.styles";

const UserRank = ({ user, users, rankData, setIsProfile }: UserRankingProps) => {

    const dispatch = useDispatch()

    const showProfile = () => {
        dispatch(getUser({
            id: user._id,
            user: users,
            setIsProfile
        }) as any)
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
        <Pressable style={rankingStyles.userRanking} onPress={showProfile}>
            <Text style={rankingStyles.infoUserRank}>{user.nickname}</Text>
            <Text style={rankingStyles.infoUserRank}>{pointsRank()} xp</Text>
        </Pressable>
    )
}

export default UserRank