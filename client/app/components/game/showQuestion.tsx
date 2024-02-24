import { View } from "react-native";

import HeaderQuestion from "./components/showQuestion/HeaderQuestion";
import ImageQuestion from "./components/showQuestion/ImageQuestion";

import { ShowQuestionProps } from "../../types/props.types";

import { gameStyles } from '../../styles/game.styles';

const ShowQuestion = ({ questions, numberQuestion }: ShowQuestionProps) => {
    return (
        <View style={gameStyles.containerQuestion}>
            <HeaderQuestion question={questions[numberQuestion]} />
            {
                questions[numberQuestion].image &&
                <ImageQuestion question={questions[numberQuestion]} />
            }
        </View>
    )
}

export default ShowQuestion