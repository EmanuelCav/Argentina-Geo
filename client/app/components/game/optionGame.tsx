import { TouchableOpacity, Text } from "react-native";

import { ButtonNavigateProps } from "../../types/props.types";

import { gameStyles } from '../../styles/game.styles';

const OptionsGame = ({ text, redirect }: ButtonNavigateProps) => {
    return (
        <TouchableOpacity onPress={redirect} style={gameStyles.buttonOptions}>
            <Text style={gameStyles.textButtonOptions}>{text}</Text>
        </TouchableOpacity>
    )
}

export default OptionsGame