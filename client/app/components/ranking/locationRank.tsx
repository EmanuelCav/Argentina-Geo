import { Text, View, TouchableOpacity } from "react-native";

import { rankingStyles } from "../../styles/home.styles";

import { LocationRankProps } from "../../types/props.types";

const LocationRank = ({ location, index }: LocationRankProps) => {

    return (
        <TouchableOpacity style={rankingStyles.userRanking}>
            <View style={rankingStyles.containerUserRank}>
                <View style={rankingStyles.topUser}>
                    <Text style={rankingStyles.topUserRank}>{index + 1}</Text>
                    <Text style={rankingStyles.infoUserRank}>{location._id.slice(0, 15)}
                        {location._id.length > 16 && <Text>..</Text>}
                    </Text>
                </View>
                <View style={rankingStyles.containExpUser}>
                    <Text style={rankingStyles.pointsUserRank}>{location.points}xp</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default LocationRank