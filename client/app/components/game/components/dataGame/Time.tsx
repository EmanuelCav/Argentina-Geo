import { Text, View } from "react-native";

import { TimePropsType } from "../../../../types/props.types";

import { gameStyles } from '../../../../styles/game.styles';

const Time = ({ seconds, minutes }: TimePropsType) => {
    return (
        <View style={[{ width: '33.33%' }, gameStyles.containDataGame]}>
            <Text style={gameStyles.textDataGame}>
                {minutes <= 9 ? `0${minutes}` : `${minutes}`}
                :
                {seconds <= 9 ? `0${seconds}` : `${seconds}`}
            </Text>
        </View>
    )
}

export default Time