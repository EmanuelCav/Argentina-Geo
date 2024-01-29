import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'

import { SelectOptionProps } from '../../../../types/props.types'
import { IOptions } from '../../../../interface/User'

import { menuStyles } from '../../../../styles/menu.styles'

const SelectOption = ({ setOptionsData, amountOptions }: SelectOptionProps) => {

    const optionData = (e: GestureResponderEvent, value: number) => {
        setOptionsData((optionData: IOptions) => ({
            ...optionData, amountOptions: value
        }))
    }

    return (
        <View style={menuStyles.containOptionsSelector}>
            <Text style={menuStyles.textTitleOptions}>Cantidad de opciones</Text>
            <TouchableOpacity style={amountOptions === 2 ? menuStyles.buttonOptionsSelected : menuStyles.buttonOptions}
                onPress={(e) => optionData(e, 2)}>
                <Text style={amountOptions === 2 ? menuStyles.textButtonOptionsSelected : menuStyles.textButtonOptions}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={amountOptions === 4 ? menuStyles.buttonOptionsSelected : menuStyles.buttonOptions}
                onPress={(e) => optionData(e, 4)}>
                <Text style={amountOptions === 4 ? menuStyles.textButtonOptionsSelected : menuStyles.textButtonOptions}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={amountOptions === 6 ? menuStyles.buttonOptionsSelected : menuStyles.buttonOptions}
                onPress={(e) => optionData(e, 6)}>
                <Text style={amountOptions === 6 ? menuStyles.textButtonOptionsSelected : menuStyles.textButtonOptions}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={amountOptions === 8 ? menuStyles.buttonOptionsSelected : menuStyles.buttonOptions}
                onPress={(e) => optionData(e, 8)}>
                <Text style={amountOptions === 8 ? menuStyles.textButtonOptionsSelected : menuStyles.textButtonOptions}>8</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectOption