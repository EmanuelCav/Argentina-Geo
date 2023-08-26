import { View, Text } from "react-native";

import { menuStyles } from '../../styles/menu.styles'

const OptionsGame = () => {
    return (
        <View style={menuStyles.containerCategories}>
            <View style={menuStyles.categoriesContain}>
                <Text>OptionsGame</Text>
            </View>
        </View>
    )
}

export default OptionsGame