import { Text, StyleSheet, Pressable } from "react-native";

import { OptionGamePropsType } from "../../types/playing.types";

import { gameStyles } from '../../styles/game.styles';

const OptionGame = ({ text, nextQuestion, disabled }: OptionGamePropsType) => {
    
    const styles = StyleSheet.create({
        textButtonOptions: {
            color: "#ffffff",
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