import { TouchableOpacity, Text } from 'react-native'

import { settingsStyles } from '../../../../styles/settings.styles'

import { ButtonNavigatePropsType } from '../../../../types/settings.types'

const ButtonSettings = ({ text, redirect }: ButtonNavigatePropsType) => {
    return (
        <TouchableOpacity style={settingsStyles.buttonSettings} onPress={redirect}>
            <Text style={settingsStyles.textButtonSettings}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ButtonSettings