import { View, Text, Dimensions } from "react-native";

import { gameStyles } from "../../../../styles/game.styles";

const ShowCorrect = ({ answer }: { answer: string }) => {
    return (
        <View style={gameStyles.showCorrect}>
            <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 47, textAlign: 'center' }}>Respuesta correcta:</Text>
            <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 47, textAlign: 'center' }}>{answer}</Text>
        </View>
    )
}

export default ShowCorrect