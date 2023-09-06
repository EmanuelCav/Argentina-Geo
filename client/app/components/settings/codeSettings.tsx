import { View, Text } from "react-native";

import { sectionStyle } from '../../styles/settings.styles'

const CodeSettings = ({ password }: { password: string }) => {
    return (
        <View style={sectionStyle.containCode}>
            <Text style={sectionStyle.textCode}>Código de entrada: {password}</Text>
            <Text style={sectionStyle.changeTextCode} onPress={() => console.log("Heloo")}>Cambiar</Text>
        </View>
    )
}

export default CodeSettings