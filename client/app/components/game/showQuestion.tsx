import { View, Text, Image } from "react-native";

import { ShowQuestionProps } from "../../types/props.types";

import { gameStyles } from '../../styles/game.styles';

const ShowQuestion = ({ questions, numberQuestion }: ShowQuestionProps) => {
    return (
        <View style={gameStyles.containerQuestion}>
            <View style={[{ width: '100%', justifyContent: 'center', alignItems: 'center' }, { height: questions[numberQuestion].image && '33%' }]}>
                <Text style={gameStyles.textQuestionGame}>{questions[numberQuestion].question}</Text>
            </View>
            {

                questions[numberQuestion].image &&
                <View style={{ height: '67%', width: '100%' }}>
                    <Image source={{ uri: questions[numberQuestion].image.image }}
                        style={gameStyles.imageQuestion} resizeMode={"contain"} />
                </View>
            }
        </View>
    )
}

export default ShowQuestion