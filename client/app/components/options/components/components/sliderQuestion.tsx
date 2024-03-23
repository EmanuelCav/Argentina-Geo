import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from '@react-native-community/slider';

import { SelectQuestionProps } from "../../../../types/props.types";
import { IOptions } from "../../../../interface/User";

import { menuStyles } from '../../../../styles/menu.styles'

const sliderQuestion = ({ setOptionsData, amountQuestions }: SelectQuestionProps) => {

    return (
        <View style={menuStyles.containQuestionSelector}>
            <Text style={menuStyles.textTitleOptions}>Cantidad de preguntas</Text>
            <Text style={menuStyles.textQuestionOptions}>{amountQuestions}</Text>
            <Slider
                style={sliderStyle.slider}
                thumbTintColor='#597EEE'
                minimumValue={5}
                maximumValue={20}
                value={amountQuestions}
                minimumTrackTintColor="#597EEE"
                maximumTrackTintColor="#4488BB"
                onValueChange={(value) => setOptionsData((optionData: IOptions) => ({
                    ...optionData, amountQuestions: value
                }))}
                step={5}
                accessibilityRole={undefined}
            />
        </View>
    )
}

const sliderStyle = StyleSheet.create({
    slider: {
        width: '100%',
        height: Dimensions.get("window").height / 18.5
    }
})

export default sliderQuestion