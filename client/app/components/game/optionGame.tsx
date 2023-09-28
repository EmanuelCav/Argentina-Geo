import { TouchableOpacity, Text } from "react-native";

import { ButtonNavigateProps } from "../../types/props.types";

import { gameStyles } from '../../styles/game.styles';

const OptionsGame = ({ text, redirect, styles }: ButtonNavigateProps) => {
    return (
        <TouchableOpacity onPress={redirect} style={gameStyles.buttonOptions}>
            <Text adjustsFontSizeToFit style={styles.textButtonOptions}>{text}</Text>
        </TouchableOpacity>
    )
}

export default OptionsGame