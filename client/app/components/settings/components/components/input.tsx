import { View, Text, TextInput } from "react-native";

import { authStyles } from "../../../../styles/settings.styles";

import { InputProps } from "../../../../types/props.types";

const Input = ({ label, value, handleChange, isPassword }: InputProps) => {
    return (
        <View style={authStyles.separator}>
            <Text style={authStyles.labelForm}>{label}</Text>
            <TextInput style={authStyles.inputAuth} value={value} onChangeText={handleChange} autoComplete="off" secureTextEntry={isPassword} />
        </View>
    )
}

export default Input