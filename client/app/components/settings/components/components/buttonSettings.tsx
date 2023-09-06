import { TouchableOpacity, Text } from 'react-native'

import { newStyles } from '../../../../styles/settings.styles'

import { ButtonNavigateProps } from '../../../../types/props.types'

const ButtonSettings = ({ text, redirect }: ButtonNavigateProps) => {
    return (
        <TouchableOpacity style={newStyles.buttonSettings} onPress={redirect}>
            <Text style={newStyles.textButtonSettings}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ButtonSettings