import { View, Text } from 'react-native'

import { gameStyles } from '../../../../styles/game.styles'

import { DataFinishPropsType } from '../../../../types/props.types'

const DataFinish = ({ minutes, seconds, isGameError, corrects, points }: DataFinishPropsType) => {
    return (
        <View style={gameStyles.containerDataFinish}>
            {
                isGameError ? (
                    <Text style={gameStyles.textDataGame}>¡Repaso realizado!</Text>
                ) : (
                    <View>
                        <Text style={gameStyles.textDataGame}>Respuestas correctas: {corrects}</Text>
                        <Text style={gameStyles.textDataGame}>
                            Tiempo: {minutes <= 9 ? `0${minutes}` : `${minutes}`}:{seconds <= 9 ? `0${seconds}` : `${seconds}`}
                        </Text>
                        <Text style={gameStyles.textDataGame}>Total de puntos: {points}xp</Text>
                    </View>
                )
            }
        </View>
    )
}

export default DataFinish