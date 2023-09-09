import { View, Text } from "react-native";

import { IUser } from "../../interface/User";

import { rankingStyles } from "../../styles/home.styles";

const UserRank = ({ user }: { user: IUser }) => {
    return (
        <View style={rankingStyles.userRanking}>
            <Text style={rankingStyles.infoUserRank}>{user.nickname}</Text>
            <Text style={rankingStyles.infoUserRank}>{user.points.total} xp</Text>
        </View>
    )
}

export default UserRank