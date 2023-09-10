import { View, Text } from "react-native";

import { CodeProps } from "../../types/props.types";

import { sectionStyle } from '../../styles/settings.styles'

const CodeSettings = ({ password, nickname, setIsAuth, setIsCode, setIsNickname }: CodeProps) => {

    const changeUser = () => {
        setIsAuth(true)
    }

    const ChangeNickname = () => {
        setIsNickname(true)
    }

    const changeCode = () => {
        setIsCode(true)
    }

    return (
        <View style={sectionStyle.containerMoreSettings}>
            <View style={sectionStyle.containCode}>
                <Text style={sectionStyle.textCode}>Nombre de usuario: {nickname}</Text>
                <Text style={sectionStyle.changeTextCode} onPress={ChangeNickname}>Cambiar nombre de usuario</Text>
            </View>
            <View style={sectionStyle.containCode}>
                <Text style={sectionStyle.textCode}>Código de entrada: {password}</Text>
                <Text style={sectionStyle.changeTextCode} onPress={changeCode}>Cambiar código</Text>
            </View>
            <Text style={sectionStyle.changeTextCode} onPress={changeUser}>Cambiar de usuario</Text>
        </View>
    )
}

export default CodeSettings