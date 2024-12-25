import { View, Text } from "react-native";
import Slider from '@react-native-community/slider';

import { SliderQuestionPropsType } from "../../types/options.types";
import { IOptions } from "../../interface/User";

import { optionStyles } from "../../styles/options.styles";

const SliderQuestion = ({ setOptionsData, amountQuestions }: SliderQuestionPropsType) => {

    return (
        <View style={optionStyles.containerSliderQuestion}>
            <Text style={optionStyles.textTitleOptions}>Cantidad de preguntas</Text>
            <Text style={optionStyles.textQuestionOptions}>{amountQuestions}</Text>
            <Slider
            style={{ width: '100%', transform: [{ scaleY: 1.25 }] }}
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

export default SliderQuestion