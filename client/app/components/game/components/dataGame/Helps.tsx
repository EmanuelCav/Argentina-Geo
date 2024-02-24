import { View, Text, Pressable, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { gameStyles } from '../../../../styles/game.styles'

import { HelpsPropsType } from '../../../../types/props.types'

const Helps = ({ changeHelp, helps, isHelped }: HelpsPropsType) => {
    return (
        <View style={[{ flex: 1 }, gameStyles.containDataGame]}>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#5d8cff' : `${isHelped ? '#DDDDDD' : '#597EEE'}` 
                },
                gameStyles.buttonHelp
            ]}
            onPress={() => changeHelp('help')}
            disabled={isHelped}>
                <Text style={gameStyles.textGame}>{helps}</Text>
                <Icon name='help' color={'#ffffff'} size={Dimensions.get("window").height / 39} />
            </Pressable>
        </View>
    )
}

export default Helps