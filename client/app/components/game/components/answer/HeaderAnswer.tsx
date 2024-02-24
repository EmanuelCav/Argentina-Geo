import { View, Text, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { gameStyles } from '../../../../styles/game.styles'

const HeaderAnswer = ({ isCorrect }: { isCorrect: boolean }) => {
    return (
        <View style={gameStyles.headerAnswer}>
            <Icon name={isCorrect ? 'checkmark-circle' : 'close-circle'} color={isCorrect ? '#0f0' : '#f00'} size={Dimensions.get("window").height / 33} />
            <Text style={{ color: isCorrect ? '#0f0' : '#f00', fontSize: Dimensions.get("window").height / 33 }}>{isCorrect ? 'Correcto' : 'Incorrecto'}</Text>
        </View>
    )
}

export default HeaderAnswer