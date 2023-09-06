import { View, Text, TouchableOpacity } from "react-native";

import ButtonSettings from "./components/components/buttonSettings";

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
            <ButtonSettings text="Soy un jugador nuevo" redirect={redirectHome} />
            <ButtonSettings text="Ya tengo un usuario" redirect={redirectForm} />
        </View>
    )
}

export default NewUser