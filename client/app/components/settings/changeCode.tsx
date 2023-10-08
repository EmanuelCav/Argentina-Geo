import { useState } from "react";
import { View } from "react-native";
import { useDispatch } from 'react-redux'

import Input from "./components/components/input";
import ButtonSettings from "./components/components/buttonSettings";
import Error from "../../components/response/error";

import { updatePasswordApi } from '../../server/api/user.api'
import { updateOptionsAction } from '../../server/features/user.features'

import { IPassword } from "../../interface/User";
import { ChangeCodeProps } from "../../types/props.types";

import { authStyles } from '../../styles/settings.styles'

const ChangeCode = ({ setIsCode, user }: ChangeCodeProps) => {

    const dispatch = useDispatch()

    const initialState: IPassword = {
        password: user.user.password
    }

    const [passwordData, setPasswordData] = useState<IPassword>(initialState)
    const [message, setMessage] = useState<string>("")

    const { password } = passwordData;

    const handleChangePassword = (value: string) => {
        setPasswordData({
            ...passwordData,
            password: value
        })
    }

    const handleSumbit = async () => {

        try {
            const { data } = await updatePasswordApi(user.user._id, passwordData, user.token)
            dispatch(updateOptionsAction(data))
            setIsCode(false)
        } catch (error: any) {
            setMessage(error.response.data.message)
        }
    }

    const redirectSettings = () => {
        setIsCode(false)
    }

    return (
        <View style={authStyles.containerAuth} >
            <View style={authStyles.containerForm}>
                <Error msg={message} />
                <Input label="Código de entrada" value={password} handleChange={handleChangePassword} isPassword={false} />
                <View style={authStyles.separator}>
                    <ButtonSettings text="Aceptar" styles={null} redirect={handleSumbit} />
                    <ButtonSettings text="Regresar" styles={null} redirect={redirectSettings} />
                </View>
            </View>
        </View>
    )
}

export default ChangeCode