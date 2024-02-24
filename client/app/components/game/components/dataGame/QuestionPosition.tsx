import { View, Text } from 'react-native'

import { QuestionPositionPropsType } from '../../../../types/props.types'

import { gameStyles } from '../../../../styles/game.styles'

const QuestionPosition = ({ numberQuestion, amountQuestions }: QuestionPositionPropsType) => {
    return (
        <View style={[{ width: '33.33%' }, gameStyles.containDataGame]}>
            <Text style={gameStyles.textDataGame}>{numberQuestion}/{amountQuestions}</Text>
        </View>
    )
}

export default QuestionPosition