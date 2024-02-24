import { useState } from "react";
import { View } from "react-native";
import { useDispatch } from 'react-redux'

import Input from "./components/components/Input";
import ButtonSettings from "./components/components/ButtonSettings";
import Error from "../response/Error";

import { updateNicknameApi } from '../../server/api/user.api'
import { updateOptionsAction } from '../../server/features/user.features'

import { INickname } from "../../interface/User";
import { ChangeNicknameProps } from "../../types/props.types";

import { authStyles } from '../../styles/settings.styles'

const ChangeCode = ({ setIsNickname, user }: ChangeNicknameProps) => {

    const dispatch = useDispatch()

    const initialState: INickname = {
        nickname: user.user.nickname
    }

    const [message, setMessage] = useState<string>("")
    const [nicknameData, setNicknameData] = useState<INickname>(initialState)

    const { nickname } = nicknameData;

    const handleChangePassword = (value: string) => {
        setNicknameData({
            ...nicknameData,
            nickname: value
        })
    }

    const handleSumbit = async () => {

        try {
            const { data } = await updateNicknameApi(user.user._id, nicknameData, user.token)
            dispatch(updateOptionsAction(data))
            setIsNickname(false)
        } catch (error: any) {
            setMessage(error.response.data.message)
        }
    }

    const redirectSettings = () => {
        setIsNickname(false)
    }

    return (
        <View style={authStyles.containerAuth} >
            <View style={authStyles.containerForm}>
                <Error msg={message} />
                <Input label="Nombre de usuario" value={nickname} handleChange={handleChangePassword} isPassword={false} />
                <View style={authStyles.separator}>
                    <ButtonSettings text="Aceptar" styles={null} redirect={handleSumbit} />
                    <ButtonSettings text="Regresar" styles={null} redirect={redirectSettings} />
                </View>
            </View>
        </View>
    )
}

export default ChangeCode