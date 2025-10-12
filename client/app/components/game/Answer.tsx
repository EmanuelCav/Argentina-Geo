import { Pressable, Text, Dimensions } from "react-native"

import ShowCorrect from "./components/answer/ShowCorrect";
import HeaderAnswer from "./components/answer/HeaderAnswer";

import { gameStyles } from "../../styles/game.styles";

import { AnswerPropsType } from "../../types/playing.types";

const Answer = ({ isCorrect, answer, continueGame, numberQuestion, amountQuestions }: AnswerPropsType) => {
    return (
        <Pressable style={[gameStyles.containerAnswer, {
            borderColor: isCorrect ? '#02c028' : '#f00'
        }]}
            onPress={continueGame} disabled={numberQuestion >= amountQuestions}>
            <HeaderAnswer isCorrect={isCorrect} />
            <Text style={{ color: isCorrect ? '#02c028' : '#f00', fontSize: Dimensions.get("window").height / 41, fontWeight: 'bold' }}>
                Toca para continuar
            </Text>
            {
                !isCorrect && <ShowCorrect answer={answer} />
            }
        </Pressable>
    )
}

export default Answer