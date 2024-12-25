import { Pressable, Text } from "react-native"

import { optionStyles } from "../../../styles/options.styles"

import { OptionSelectPropsType } from "../../../types/options.types"

const OptionSelect = ({ amountOptions, number, optionData }: OptionSelectPropsType) => {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#6b8cf2' : amountOptions === number ? '#597EEE' : '#ffffff',
                borderColor: amountOptions === number ? "#ffffff" : "#597eee"
            },
            optionStyles.buttonOptions
        ]}
            onPress={() => optionData(number)}>
            <Text style={[optionStyles.textButtonOptions, { color: amountOptions === number ? '#ffffff' : '#597eee' }]}>
                {number}
            </Text>
        </Pressable>
    )
}

export default OptionSelect