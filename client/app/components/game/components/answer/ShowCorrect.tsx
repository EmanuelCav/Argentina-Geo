import { View, Text, Dimensions } from "react-native";

import { gameStyles } from "../../../../styles/game.styles";

const ShowCorrect = ({ answer }: { answer: string }) => {
    return (
        <View style={gameStyles.showCorrect}>
            <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 37 }}>Respuesta correcta: {answer}</Text>
        </View>
    )
}

export default ShowCorrect