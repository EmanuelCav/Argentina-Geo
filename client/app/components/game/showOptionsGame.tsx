import { View } from "react-native";

import OptionsSection from "./components/optionGame/OptionsSection";

import { ShowOptionGamePropsType } from "../../types/playing.types";

import { gameStyles } from '../../styles/game.styles';

const ShowOptionsGame = ({ options, nextQuestion, amountOptions, isHelped, optionsHelped }: ShowOptionGamePropsType) => {
    return (
        <View style={gameStyles.containerOptions}>
            <OptionsSection options={options.slice(0, options.length / 2)} nextQuestion={nextQuestion}
                amountOptions={amountOptions} isHelped={isHelped} optionsHelped={optionsHelped} />
            <OptionsSection options={options.slice(options.length / 2, options.length)} nextQuestion={nextQuestion}
                amountOptions={amountOptions} isHelped={isHelped} optionsHelped={optionsHelped} />
        </View>
    )
}

export default ShowOptionsGame