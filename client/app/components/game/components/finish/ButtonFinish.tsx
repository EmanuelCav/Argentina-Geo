import { Pressable, Text } from 'react-native'

import { gameStyles } from '../../../../styles/game.styles'

const ButtonFinish = ({ func }: { func: () => void }) => {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#6b8cf2' : '#597EEE',
            },
            gameStyles.buttonFinish
        ]}
            onPress={func}>
            <Text style={gameStyles.textButtonFinish}>CONTINUAR</Text>
        </Pressable>
    )
}

export default ButtonFinish