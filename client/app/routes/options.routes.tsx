import { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ButtonAccept from "../components/general/ButtonAccept";
import SelectOption from "../components/options/SelectOption";
import SliderQuestion from "../components/options/SliderQuestion";
import Container from "../Container";

import { StackNavigation } from "../types/props.types";

import { configStyles } from "../styles/config.styles";

import { IOptions } from "../interface/User";
import { IReducer } from "../interface/Reducer";

import { updateOptions } from "../server/actions/user.actions";

import { selector } from "../helper/selector";

const Options = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const initialState: IOptions = {
        amountQuestions: users.user.user?.amountQuestions!,
        amountOptions: users.user.user?.amountOptions!
    }

    const [optionsData, setOptionsData] = useState<IOptions>(initialState)

    const { amountOptions, amountQuestions } = optionsData

    const acceptOptions = async () => {
        dispatch(updateOptions({
            navigation,
            optionsData,
            user: users.user
        }) as any)
    }

    return (
        <Container>
            <View style={configStyles.configContain}>
                <SelectOption setOptionsData={setOptionsData}
                    amountOptions={amountOptions} />
                <SliderQuestion setOptionsData={setOptionsData}
                    amountQuestions={amountQuestions} />
            </View>
            <ButtonAccept func={acceptOptions} isCategory={false} text="ACEPTAR" />
        </Container>
    )
}

export default Options