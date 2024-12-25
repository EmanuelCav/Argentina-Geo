import { View, Text, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { gameStyles } from '../../../../styles/game.styles'

const HeaderAnswer = ({ isCorrect }: { isCorrect: boolean }) => {
    return (
        <View style={gameStyles.headerAnswer}>
            <Icon name={isCorrect ? 'checkmark-circle' : 'close-circle'} color={isCorrect ? '#02c028' : '#f00'} size={Dimensions.get("window").height / 33} />
            <Text style={{ color: isCorrect ? '#02c028' : '#f00', fontSize: Dimensions.get("window").height / 33, marginLeft: Dimensions.get("window").height / 106 }}>
                {isCorrect ? 'Correcto' : 'Incorrecto'}
            </Text>
        </View>
    )
}

export default HeaderAnswer