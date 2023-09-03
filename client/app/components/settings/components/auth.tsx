import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { authStyles, newStyles } from '../../../styles/settings.styles'

const Auth = ({ setIsAuth }: { setIsAuth: (isAuth: boolean) => void }) => {

    const redirectNew = () => {
        setIsAuth(false)
    }

    return (
        <View style={authStyles.containerAuth} >
            <View style={authStyles.containerForm}>
                <View style={authStyles.separator}>
                    <Text style={authStyles.labelForm}>Nombre de usuario</Text>
                    <TextInput style={authStyles.inputAuth} />
                </View>
                <View style={authStyles.separator}>
                    <Text style={authStyles.labelForm}>Código de entrada</Text>
                    <TextInput style={authStyles.inputAuth} />
                </View>
                <View style={authStyles.separator}>
                    <TouchableOpacity style={newStyles.buttonSettings}>
                        <Text style={newStyles.textButtonSettings}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={newStyles.buttonSettings} onPress={redirectNew}>
                        <Text style={newStyles.textButtonSettings}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Auth