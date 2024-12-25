import { useState } from "react";
import { View, Text, TextInput } from "react-native";

import { settingsStyles } from "../../../../styles/settings.styles";

import { InputPropsType } from "../../../../types/settings.types";

const Input = ({ label, value, handleChange, isPassword }: InputPropsType) => {

    const [isFocused, setIsFocused] = useState<boolean>(false)

    return (
        <View style={settingsStyles.separator}>
            <Text style={settingsStyles.labelForm}>{label}</Text>
            <TextInput selectionColor={"#597EEE"} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} 
            style={isFocused ? settingsStyles.inputAuthFocused : settingsStyles.inputAuth} value={value} onChangeText={handleChange} autoComplete="off" 
            maxLength={isPassword ? 32 : 16} />
        </View>
    )
}

export default Input