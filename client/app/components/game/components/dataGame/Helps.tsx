import { View, Text } from 'react-native'

import { gameStyles } from '../../../../styles/game.styles'

const Helps = () => {
    return (
        <View style={[{ flex: 1 }, gameStyles.containDataGame]}>
            <Text>Helps</Text>
        </View>
    )
}

export default Helps