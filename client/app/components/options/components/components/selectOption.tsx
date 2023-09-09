import { View, Text, TouchableOpacity } from 'react-native'

import { SelectOptionProps } from '../../../../types/props.types'

import { menuStyles } from '../../../../styles/menu.styles'

const SelectOption = ({ setOptionsData, optionsData, amountOptions }: SelectOptionProps) => {
    return (
        <View style={menuStyles.containOptionsSelector}>
            <Text style={menuStyles.textTitleOptions}>Cantidad de opciones</Text>
            <TouchableOpacity style={menuStyles.buttonOptions}>
                <Text style={menuStyles.textButtonOptions}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={menuStyles.buttonOptions}>
                <Text style={menuStyles.textButtonOptions}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={menuStyles.buttonOptions}>
                <Text style={menuStyles.textButtonOptions}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={menuStyles.buttonOptions}>
                <Text style={menuStyles.textButtonOptions}>8</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectOption