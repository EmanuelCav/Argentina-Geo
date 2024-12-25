import { Text } from 'react-native'

import { QuestionPositionPropsType } from '../../../../types/playing.types'

import { gameStyles } from '../../../../styles/game.styles'

const QuestionPosition = ({ numberQuestion, amountQuestions }: QuestionPositionPropsType) => {
    return (
        <Text style={gameStyles.textDataGame}>{numberQuestion}/{amountQuestions}</Text>
    )
}

export default QuestionPosition