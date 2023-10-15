import { useEffect } from 'react'
import { View, Text, TouchableOpacity, GestureResponderEvent, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

import { SelectOptionProps } from '../../../../types/props.types'
import { IOptions } from '../../../../interface/User'

import { menuStyles } from '../../../../styles/menu.styles'
import { homeStyles } from '../../../../styles/home.styles'

const SelectOption = ({ setOptionsData, optionsData, amountOptions, level }: SelectOptionProps) => {

    const isSix = (): boolean => {
        if (level < 7) {
            return true
        }

        return false
    }

    const isEight = (): boolean => {
        if (level < 14) {
            return true
        }

        return false
    }

    useEffect(() => {
    }, [optionsData])

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
            <TouchableOpacity style={[amountOptions === 6 ? menuStyles.buttonOptionsSelected : menuStyles.buttonOptions, isSix() && {
                backgroundColor: '#888',
                opacity: 0.75
            }]}
                onPress={(e) => optionData(e, 6)} disabled={isSix()}>
                {
                    isSix() &&
                    <View style={homeStyles.containerIconUnlockCategory}>
                        <AntDesign name="lock" selectable={undefined} color={"#fff"} style={homeStyles.iconUnlockCategory} size={Dimensions.get('window').height / 37} />
                    </View>
                }
                <Text style={amountOptions === 6 ? menuStyles.textButtonOptionsSelected : menuStyles.textButtonOptions}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[amountOptions === 8 ? menuStyles.buttonOptionsSelected : menuStyles.buttonOptions, isEight() && {
                backgroundColor: '#888',
                opacity: 0.75
            }]}
                onPress={(e) => optionData(e, 8)} disabled={isEight()}>
                {
                    isEight() &&
                    <View style={homeStyles.containerIconUnlockCategory}>
                        <AntDesign name="lock" selectable={undefined} color={"#fff"} style={homeStyles.iconUnlockCategory} size={Dimensions.get('window').height / 37} />
                    </View>
                }
                <Text style={amountOptions === 8 ? menuStyles.textButtonOptionsSelected : menuStyles.textButtonOptions}>8</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectOption