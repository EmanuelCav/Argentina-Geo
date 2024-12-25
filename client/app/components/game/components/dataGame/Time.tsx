import { Text } from "react-native";

import { TimePropsType } from "../../../../types/playing.types";

import { gameStyles } from '../../../../styles/game.styles';

const Time = ({ seconds, minutes }: TimePropsType) => {
    return (
        <Text style={gameStyles.textDataGame}>
            {minutes <= 9 ? `0${minutes}` : `${minutes}`}
            :
            {seconds <= 9 ? `0${seconds}` : `${seconds}`}
        </Text>
    )
}

export default Time