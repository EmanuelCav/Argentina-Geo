import { Text, View, Pressable } from "react-native";

import { LocationRankPropsType } from "../../types/ranking.types";

import { rankingStyles } from "../../styles/ranking.styles";

const LocationRank = ({ location, index }: LocationRankPropsType) => {

    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#5cc197' : '#5dc1b9',
            },
            rankingStyles.userRanking
        ]}>
            <View style={rankingStyles.topUser}>
                <Text style={rankingStyles.topUserRank}>{index + 1}</Text>
                <Text style={rankingStyles.userRank}>{location._id.slice(0, 15)}
                    {location._id.length > 16 && <Text>..</Text>}
                </Text>
            </View>
            <View style={rankingStyles.containExpUser}>
                <Text style={rankingStyles.pointsUserRank}>{location.points}xp</Text>
            </View>
        </Pressable>
    )
}

export default LocationRank