import { Pressable, View, Text, Dimensions } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import { gameStyles } from '../../../../styles/game.styles'

import { HelpType } from '../../../../types/props.types'

const HelpAdd = ({ changeHelp }: { changeHelp: (type: HelpType) => void }) => {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#5d8cff' : '#597EEE'
            },
            gameStyles.buttonHelpFinish
        ]} onPress={() => changeHelp('add')}>
            <View style={gameStyles.containHelpText}>
                <Entypo name='help' color={'#ffffff'} size={Dimensions.get("window").height / 39} />
                <Text style={gameStyles.textGame}>Ayudas x2</Text>
            </View>
            <Entypo name='video' color={'#ffffff'} size={Dimensions.get("window").height / 37} />
        </Pressable>
    )
}

export default HelpAdd