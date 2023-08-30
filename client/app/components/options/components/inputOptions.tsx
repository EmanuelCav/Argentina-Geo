import { useState } from 'react'
import { View, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-native-picker-select'

import ButtonMenu from "../../buttonMenu";

import { updateOptionsApi } from '../../../server/api/user.api'
import { updateOptionsAction } from '../../../server/features/user.features'

import { IOptions } from '../../../interface/User';
import { IReducer } from '../../../interface/Reducer';

import { homeStyles } from '../../../styles/home.styles'
import { menuStyles } from '../../../styles/menu.styles'

import { selector } from '../../../helper/selector';

const InputOptions = ({ setIsOptionsGame }: { setIsOptionsGame: (isOptionsGame: boolean) => void }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const initialState: IOptions = {
        amountQuestions: String(users.user.user.amountQuestions),
        amountOptions: String(users.user.user.amountOptions)
    }

    const [optionsData, setOptionsData] = useState<IOptions>(initialState)

    const { amountOptions, amountQuestions } = optionsData

    const acceptOptions = async () => {

        try {
            const { data } = await updateOptionsApi(users.user.user._id, optionsData, users.user.token)
            dispatch(updateOptionsAction(data))
            setIsOptionsGame(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={menuStyles.categoriesContain}>
            <View>
                <Text>Cantidad de opciones</Text>
                <Select
                    onValueChange={(value) => setOptionsData(optionData => ({
                        ...optionData, amountOptions: value
                    }))}
                    items={[{
                        label: '2', value: '2'
                    }, {
                        label: '4', value: '4'
                    }, {
                        label: '6', value: '6'
                    }, {
                        label: '8', value: '8'
                    }]}
                    value={amountOptions}
                />
            </View>
            <View>
                <Text>Cantidad de preguntas</Text>
                <Select
                    onValueChange={(value) => setOptionsData(optionData => ({
                        ...optionData, amountQuestions: value
                    }))}
                    items={[{
                        label: '10', value: '10'
                    }, {
                        label: '20', value: '20'
                    }, {
                        label: '30', value: '30'
                    }, {
                        label: '40', value: '40'
                    }, {
                        label: '50', value: '50'
                    }]}
                    value={amountQuestions}
                />
            </View>
            <View style={homeStyles.containerActionsView}>
                <ButtonMenu text="Aceptar" redirect={acceptOptions} />
            </View>
        </View>
    )
}

export default InputOptions