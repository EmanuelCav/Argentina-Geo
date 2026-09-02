import { Pressable, View, Text, Modal } from "react-native";

import { gameStyles } from '../../styles/game.styles'

const PreFinish = ({ redirectFinish }: { redirectFinish: () => void }) => {
    return (
        <Modal
            visible
            transparent
            statusBarTranslucent
        >
            <Pressable style={gameStyles.containerPreFinish} onPress={redirectFinish}>
                <View style={gameStyles.containPreFinish}>
                    <Text style={gameStyles.textHeaderGame}>¡Juego Finalizado!</Text>
                    <Text style={gameStyles.textFinishGame}>Pulsa para continuar</Text>
                </View>
            </Pressable>
        </Modal>
    )
}

export default PreFinish