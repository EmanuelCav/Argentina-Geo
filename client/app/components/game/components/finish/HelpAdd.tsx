import { Pressable, View, Text, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { HelpType } from '../../../../types/user.types'

import { gameStyles } from '../../../../styles/game.styles'

const HelpAdd = ({ changeHelp }: { changeHelp: (type: HelpType) => void }) => {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#5d8cff' : '#597EEE'
            },
            gameStyles.buttonHelpFinish
        ]} onPress={() => changeHelp('add')}>
            <View style={gameStyles.containHelpText}>
                <Text style={gameStyles.textGame}>Ayudas</Text>
                <Text style={gameStyles.textGame}>x2</Text>
                <Icon name='help' color={'#ffffff'} size={Dimensions.get("window").height / 39} />
            </View>
            <Icon name='video' color={'#ffffff'} size={Dimensions.get("window").height / 37} />
        </Pressable>
    )
}

export default HelpAdd