import { useState } from "react";
import { View, Text, TextInput } from "react-native";

import { authStyles } from "../../../../styles/settings.styles";

import { InputProps } from "../../../../types/props.types";

const Input = ({ label, value, handleChange, isPassword }: InputProps) => {

    const [isFocused, setIsFocused] = useState<boolean>(false)

    return (
        <View style={authStyles.separator}>
            <Text style={authStyles.labelForm}>{label}</Text>
            <TextInput onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} 
            style={isFocused ? authStyles.inputAuthFocused : authStyles.inputAuth} value={value} onChangeText={handleChange} autoComplete="off" secureTextEntry={isPassword} />
        </View>
    )
}

export default Input