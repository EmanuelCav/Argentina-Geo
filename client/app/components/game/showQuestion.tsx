import { View, Text, Image, ImageSourcePropType } from "react-native";

import { ShowQuestionProps } from "../../types/props.types";

import { gameStyles } from '../../styles/game.styles';

const ShowQuestion = ({ questions, numberQuestion }: ShowQuestionProps) => {
    return (
        <View style={gameStyles.containerQuestion}>
            {
                questions[numberQuestion].question.image ? (
                    <Image source={questions[numberQuestion].question.image.image as ImageSourcePropType}
                        style={gameStyles.imageQuestion} resizeMode={'contain'} />
                ) : (
                    <View>
                        <Text>{questions[numberQuestion].question.text}</Text>
                        <Text>{questions[numberQuestion].question.text}</Text>
                    </View>
                )
            }
        </View>
    )
}

export default ShowQuestion