import { View } from "react-native";

import OptionGame from './optionGame';

import { ShowOptionGameProps } from "../../types/props.types";

import { gameStyles } from '../../styles/game.styles';

const ShowOptionsGame = ({ questions, numberQuestion, styles, nextQuestion }: ShowOptionGameProps) => {
    return (
        <View style={gameStyles.containerOptions}>
            <View style={gameStyles.containerSectionOptions}>
                {
                    questions[numberQuestion].options.map((item: string, index: number) => {
                        return <OptionGame styles={styles} text={item} key={index} redirect={() => nextQuestion(item)} />
                    }).slice(0, questions[numberQuestion].options.length / 2)
                }
            </View>
            <View style={gameStyles.containerSectionOptions}>
                {
                    questions[numberQuestion].options.map((item: string, index: number) => {
                        return <OptionGame styles={styles} text={item} key={index} redirect={() => nextQuestion(item)} />
                    }).slice(questions[numberQuestion].options.length / 2, questions[numberQuestion].options.length)
                }
            </View>
        </View>
    )
}

export default ShowOptionsGame