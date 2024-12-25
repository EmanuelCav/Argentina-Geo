import { Text, Dimensions, StyleSheet, Pressable } from "react-native";

import { OptionGamePropsType } from "../../types/playing.types";

import { gameStyles } from '../../styles/game.styles';

const OptionGame = ({ text, nextQuestion, amountOptions, disabled }: OptionGamePropsType) => {

    const usersOptions = (): number => {
        if (amountOptions === 2) {
            return 19.54
        }

        if (amountOptions === 4) {
            return 22.12
        }

        if (amountOptions === 6) {
            return 25.86
        }

        if (amountOptions === 8) {
            return 29.31
        }

        return 22.31
    }
    
    const styles = StyleSheet.create({
        textButtonOptions: {
            color: "#ffffff",
            fontSize: ((Dimensions.get("window").height - ((Dimensions.get("window").height / 60) * 2)) / 2) / usersOptions(),
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