import { View, Text, TouchableOpacity } from "react-native";

import { NewProps } from "../../types/props.types";

import { newStyles } from '../../styles/settings.styles'

const NewUser = ({ navigation, setIsAuth }: NewProps) => {

    const redirectHome = () => {
        navigation.navigate('Home')
    }

    const redirectForm = () => {
        setIsAuth(true)
    }

    return (
        <View style={newStyles.newContain}>
            <TouchableOpacity style={newStyles.buttonSettings} onPress={redirectHome} >
                <Text style={newStyles.textButtonSettings}>Soy un jugador nuevo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={newStyles.buttonSettings} onPress={redirectForm}>
                <Text style={newStyles.textButtonSettings}>Ya tengo un usuario</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewUser