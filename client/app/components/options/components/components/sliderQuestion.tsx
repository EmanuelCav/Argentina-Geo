import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from '@react-native-community/slider';

import { SelectQuestionProps } from "../../../../types/props.types";
import { IOptions } from "../../../../interface/User";

import { menuStyles } from '../../../../styles/menu.styles'

const sliderQuestion = ({ setOptionsData, optionsData, amountQuestions }: SelectQuestionProps) => {

    useEffect(() => {
    }, [optionsData])

    return (
        <View style={menuStyles.containQuestionSelector}>
            <Text style={menuStyles.textTitleOptions}>Cantidad de preguntas</Text>
            <Text style={menuStyles.textQuestionOptions}>{amountQuestions}</Text>
            <Slider
                style={[sliderStyle.slider, null]}
                thumbTintColor='#597EEE'
                minimumValue={10}
                maximumValue={50}
                value={amountQuestions}
                minimumTrackTintColor="#597EEE"
                maximumTrackTintColor="#4488BB"
                onValueChange={(value) => setOptionsData((optionData: IOptions) => ({
                    ...optionData, amountQuestions: value
                }))}
                step={5}
            />
        </View>
    )
}

const sliderStyle = StyleSheet.create({
    slider: {
        width: '100%',
        height: 40
    }
})

export default sliderQuestion