import { View, Text, Image } from "react-native";

import { ShowQuestionProps } from "../../types/props.types";

import { gameStyles } from '../../styles/game.styles';

const ShowQuestion = ({ questions, numberQuestion }: ShowQuestionProps) => {
    return (
        <View style={gameStyles.containerQuestion}>
            {
                questions[numberQuestion].question.image ? (
                    <Image source={{ uri: questions[numberQuestion].question.image.image }}
                        style={gameStyles.imageQuestion} resizeMode={"contain"} />
                ) : (
                    <View style={gameStyles.containerTextGame}>
                        <View style={{ height: '35%', width: '100%' }}>
                            <Text style={gameStyles.textQuestionGame}>{questions[numberQuestion].question.question}</Text>
                        </View>
                        <View style={{ height: '65%', width: '100%' }}>
                            <Text style={gameStyles.textTextGame}>{questions[numberQuestion].question.text}</Text>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

export default ShowQuestion