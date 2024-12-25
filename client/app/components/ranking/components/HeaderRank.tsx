import { Dimensions, View, Text } from "react-native"
import FilterIcon from 'react-native-vector-icons/FontAwesome5';

import { rankingStyles } from "../../../styles/ranking.styles"

import { HeaderRankPropsType } from "../../../types/ranking.types";

const HeaderRank = ({ users, changeFilter, rankState, positionRank }: HeaderRankPropsType) => {

    return (
        <View style={rankingStyles.containerHeaderRank}>
            <FilterIcon onPress={changeFilter} name={rankState.current[positionRank]} color={'#5d8cff'} size={Dimensions.get("window").height / 28} />
            {
                users.users.ranking?.length! > 0 &&
                <>
                    {(users.users.ranking!.map((u) => u._id).indexOf(users.user.user?._id) + 1 === 0) ? (
                        <Text style={rankingStyles.userRank}>Usted no se encuetra aquí</Text>
                    ) : (
                        <Text style={rankingStyles.userRank}>Su posición actual es {users.users.ranking!.map((u) => u._id)
                            .indexOf(users.user.user?._id) + 1}°
                        </Text>
                    )}
                </>
            }
        </View>
    )
}

export default HeaderRank