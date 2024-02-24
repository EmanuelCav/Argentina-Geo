import { View, Text } from 'react-native'

import { gameStyles } from '../../../../styles/game.styles'

import { IQuestion } from '../../../../interface/Game'

const HeaderQuestion = ({ question }: { question: IQuestion }) => {
    return (
        <View style={[gameStyles.containerHeaderQuestion, { height: question.image && '33%' }]}>
            <Text style={gameStyles.textQuestionGame}>{question.question}</Text>
        </View>
    )
}

export default HeaderQuestion