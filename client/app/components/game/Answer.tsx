import { Pressable, Text, Dimensions } from "react-native"

import ShowCorrect from "./components/answer/ShowCorrect";
import HeaderAnswer from "./components/answer/HeaderAnswer";

import { gameStyles } from "../../styles/game.styles";

import { AnswerPropsType } from "../../types/playing.types";

const Answer = ({ isCorrect, answer, continueGame }: AnswerPropsType) => {
    return (
        <Pressable style={[gameStyles.containerAnswer, {
            borderColor: isCorrect ? '#02c028' : '#f00'
        }]}
            onPress={continueGame}>
            <HeaderAnswer isCorrect={isCorrect} />
            {
                !isCorrect && <ShowCorrect answer={answer} />
            }
            <Text style={{ color: isCorrect ? '#02c028' : '#f00', fontSize: Dimensions.get("window").height / 37 }}>
                Toca para continuar
            </Text>
        </Pressable>
    )
}

export default Answer