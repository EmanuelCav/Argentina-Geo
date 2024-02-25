import { useState } from 'react'
import { View } from "react-native";
import { useSelector, useDispatch } from 'react-redux'

import ButtonMenu from "../../ButtonMenu";
import SliderQuestion from './components/SliderQuestion';
import SelectOption from './components/SelectOption';

import { updateOptionsApi } from '../../../server/api/user.api'
import { updateOptionsAction } from '../../../server/features/user.features'

import { IOptions } from '../../../interface/User';
import { IReducer } from '../../../interface/Reducer';

import { homeStyles } from '../../../styles/home.styles'
import { configGamesStyles } from '../../../styles/game.styles'

import { selector } from '../../../helper/selector';

const InputOptions = ({ setIsOptionsGame }: { setIsOptionsGame: (isOptionsGame: boolean) => void }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const initialState: IOptions = {
        amountQuestions: users.user.user.amountQuestions,
        amountOptions: users.user.user.amountOptions
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
        <View style={configGamesStyles.configGamesContain}>
            <View style={configGamesStyles.containShowConfigOptions}>
                <SelectOption setOptionsData={setOptionsData}
                    amountOptions={amountOptions} />
                <SliderQuestion setOptionsData={setOptionsData}
                    amountQuestions={amountQuestions} />
            </View>
            <View style={homeStyles.containerActionsView}>
                <ButtonMenu text="Aceptar" redirect={acceptOptions} isAccept={true} disabled={false} />
            </View>
        </View>
    )
}

export default InputOptions