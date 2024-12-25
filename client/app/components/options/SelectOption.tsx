import { View, Text } from 'react-native'

import OptionSelect from './components/OptionSelect'

import { IOptions } from '../../interface/User'
import { SelectOptionPropsType } from '../../types/options.types'

import { optionStyles } from '../../styles/options.styles'

const SelectOption = ({ setOptionsData, amountOptions }: SelectOptionPropsType) => {

    const optionData = (value: number) => {
        setOptionsData((optionData: IOptions) => ({
            ...optionData, amountOptions: value
        }))
    }

    return (
        <View style={optionStyles.containerSelectOption}>
            <Text style={optionStyles.textTitleOptions}>Cantidad de opciones</Text>
            <OptionSelect optionData={optionData} number={2} amountOptions={amountOptions} />
            <OptionSelect optionData={optionData} number={4} amountOptions={amountOptions} />
            <OptionSelect optionData={optionData} number={6} amountOptions={amountOptions} />
            <OptionSelect optionData={optionData} number={8} amountOptions={amountOptions} />
        </View>
    )
}

export default SelectOption