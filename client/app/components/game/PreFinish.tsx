import { Pressable, View, Text } from "react-native";

import { gameStyles } from '../../styles/game.styles'

const PreFinish = ({ redirectFinish }: { redirectFinish: () => void }) => {
    return (
        <Pressable style={gameStyles.containerPreFinish} onPress={redirectFinish}>
            <View style={gameStyles.containPreFinish}>
                <Text style={gameStyles.textHeaderGame}>¡Juego Finalizado!</Text>
                <Text style={gameStyles.textFinishGame}>Pulsa para continuar</Text>
            </View>
        </Pressable>
    )
}

export default PreFinish