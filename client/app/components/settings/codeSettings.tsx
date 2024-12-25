import { View, Text } from "react-native";

import { CodeSettingsPropsType } from "../../types/settings.types";

import { settingsStyles } from '../../styles/settings.styles'

const CodeSettings = ({ password, nickname, setIsAuth, setIsCode, setIsNickname }: CodeSettingsPropsType) => {

    const isChangeNickname = (): boolean => {

        const isUsuario = nickname.startsWith("usuario")

        if (isUsuario) return true

        return false
    }

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
        <View style={settingsStyles.containerMoreSettings}>
            <Text style={settingsStyles.textCode}>Nombre de usuario: <Text style={{ fontWeight: '500' }}>{nickname}</Text>
            </Text>
            {
                isChangeNickname() &&
                <Text style={settingsStyles.changeTextCode} onPress={ChangeNickname}>Cambiar nombre de usuario</Text>
            }
            <Text style={settingsStyles.textCode}>Código de entrada: <Text style={{ fontWeight: '500' }}>{password}</Text>
            </Text>
            <Text style={settingsStyles.changeTextCode} onPress={changeCode}>
                Cambiar código
            </Text>
            <Text style={settingsStyles.changeTextCode} onPress={changeUser}>Cambiar de usuario</Text>
        </View>
    )
}

export default CodeSettings