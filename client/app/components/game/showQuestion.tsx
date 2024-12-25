import { View } from "react-native";

import HeaderQuestion from "./components/showQuestion/HeaderQuestion";
import ImageQuestion from "./components/showQuestion/ImageQuestion";

import { ShowQuestionPropsType } from "../../types/playing.types";

import { gameStyles } from '../../styles/game.styles';

const ShowQuestion = ({ questions, numberQuestion }: ShowQuestionPropsType) => {
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