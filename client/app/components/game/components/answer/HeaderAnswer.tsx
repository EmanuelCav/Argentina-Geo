import { View, Text, Dimensions } from 'react-native'
import { AntDesign  } from '@expo/vector-icons';

import { gameStyles } from '../../../../styles/game.styles'

const HeaderAnswer = ({ isCorrect }: { isCorrect: boolean }) => {
    return (
        <View style={gameStyles.headerAnswer}>
            <AntDesign name={isCorrect ? 'check-circle' : 'close-circle'} color={isCorrect ? '#02c028' : '#f00'} size={Dimensions.get("window").height / 33} />
            <Text style={{ color: isCorrect ? '#02c028' : '#f00', fontSize: Dimensions.get("window").height / 41, marginLeft: Dimensions.get("window").height / 106 }}>
                {isCorrect ? 'Correcto' : 'Incorrecto'}
            </Text>
        </View>
    )
}

export default HeaderAnswer