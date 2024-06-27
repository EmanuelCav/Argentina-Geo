import { Text, View, Image } from 'react-native'

import { tentStyle } from '../../styles/tent.styles'

const HeaderTent = () => {
    return (
        <View style={tentStyle.containerHeaderTent}>
            <View style={tentStyle.containerEventTitle}>
                <Image alt='Icon' source={require('../../../assets/mercp.png')} resizeMode='contain' style={tentStyle.imageTitleTent} />
            </View>
            <View style={tentStyle.containerEventTitle}>
                <Text style={tentStyle.textTitleTent}>TIENDA</Text>
            </View>
        </View>
    )
}

export default HeaderTent