import { View, Text, TouchableOpacity } from "react-native";

import { homeStyles } from "../../styles/home.styles";

import { StackNavigation } from "../../types/props.types";

import ButtonMenu from "../buttonMenu";

const Options = ({ navigation }: { navigation: StackNavigation }) => {

    const redirectPlay = () => {
        navigation.navigate('Play')
    }

    return (
        <View style={homeStyles.containerUserOption}>
            <ButtonMenu text="Jugar" redirect={redirectPlay} />
            <ButtonMenu text="Estadísticas" redirect={redirectPlay} />
            <ButtonMenu text="Ranking" redirect={redirectPlay} />
            <ButtonMenu text="Ajustes" redirect={redirectPlay} />
        </View>
    )
}

export default Options