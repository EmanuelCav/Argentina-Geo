import { View } from "react-native";

import OptionsSection from "./components/optionGame/OptionsSection";

import { ShowOptionGameProps } from "../../types/props.types";

import { gameStyles } from '../../styles/game.styles';

const ShowOptionsGame = ({ options, nextQuestion, amountOptions }: ShowOptionGameProps) => {
    return (
        <View style={gameStyles.containerOptions}>
            <OptionsSection options={options.slice(0, options.length / 2)} nextQuestion={nextQuestion} amountOptions={amountOptions} />
            <OptionsSection options={options.slice(options.length / 2, options.length)} nextQuestion={nextQuestion} amountOptions={amountOptions} />
        </View>
    )
}

export default ShowOptionsGame