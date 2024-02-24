import { Pressable, Text, Dimensions } from "react-native"

import ShowCorrect from "./components/answer/ShowCorrect";
import HeaderAnswer from "./components/answer/HeaderAnswer";

import { gameStyles } from "../../styles/game.styles";

import { AnswerPropsType } from "../../types/props.types";

const Answer = ({ isCorrect, answer, continueGame }: AnswerPropsType) => {
    return (
        <Pressable style={[gameStyles.containerAnswer, {
            borderColor: isCorrect ? '#0f0' : '#f00'
        }]}
            onPress={continueGame}>
            <HeaderAnswer isCorrect={isCorrect} />
            {
                !isCorrect && <ShowCorrect answer={answer} />
            }
            <Text style={{ color: isCorrect ? '#0f0' : '#f00', fontSize: Dimensions.get("window").height / 37 }}>Toca para continuar</Text>
        </Pressable>
    )
}

export default Answer