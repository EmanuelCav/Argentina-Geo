import { Pressable, Text, View } from 'react-native'

import { tentStyle } from '../../../styles/tent.styles'

import { ElementTentPropsType } from '../../../types/tent.types'

const ElementTent = ({ element, handleTent }: ElementTentPropsType) => {
    return (
        <View style={tentStyle.containElement}>
            <Text style={tentStyle.titleElement}>{element.title}</Text>
            <Text style={tentStyle.priceElement}>${element.price}</Text>
            <Pressable onPress={() => handleTent(element)} style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#5d8cff' : '#597EEE',
                },
                tentStyle.buttonMenu]}>
                <Text style={tentStyle.buttonMenuText}>Comprar</Text>
            </Pressable >
        </View>
    )
}

export default ElementTent