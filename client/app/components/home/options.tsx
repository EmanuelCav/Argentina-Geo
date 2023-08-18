import { View, Text, TouchableOpacity } from "react-native";

import { homeStyles } from "../../styles/home.styles";

const Options = () => {
    return (
        <View style={homeStyles.containerUserOption}>
            <TouchableOpacity style={homeStyles.buttonUserOption}>
                <Text style={homeStyles.textButtonOption}>Jugar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.buttonUserOption}>
                <Text style={homeStyles.textButtonOption}>Estadísticas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.buttonUserOption}>
                <Text style={homeStyles.textButtonOption}>Ranking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.buttonUserOption}>
                <Text style={homeStyles.textButtonOption}>Ajustes</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Options