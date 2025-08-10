import { Text, Dimensions, StyleSheet, Pressable } from "react-native";

import { OptionGamePropsType } from "../../types/playing.types";

import { gameStyles } from '../../styles/game.styles';

const OptionGame = ({ text, nextQuestion, amountOptions, disabled }: OptionGamePropsType) => {

    const usersOptions = (): number => {
        if (amountOptions === 2) {
            return 18
        }

        if (amountOptions === 4) {
            return 16
        }

        if (amountOptions === 6) {
            return 14
        }

        if (amountOptions === 8) {
            return 12
        }

        return 16
    }
    
    const styles = StyleSheet.create({
        textButtonOptions: {
            color: "#ffffff",
            fontSize: usersOptions(),
            textAlign: 'center'
        }
    })

    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#5d8cff' : `${disabled ? '#dddddd' : '#597EEE'}`,
            },
            gameStyles.buttonOptions
        ]} 
        onPress={() => nextQuestion(text)} 
        disabled={disabled}>
            <Text adjustsFontSizeToFit style={styles.textButtonOptions}>{text}</Text>
        </Pressable>
    )
}


export default OptionGame