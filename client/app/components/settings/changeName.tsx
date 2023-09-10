import { useState } from "react";
import { View } from "react-native";
import { useDispatch } from 'react-redux'

import Input from "./components/components/input";
import ButtonSettings from "./components/components/buttonSettings";

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

    const [nicknameData, setNicknameData] = useState<INickname>(initialState)

    const { nickname } = nicknameData;

    const handleChangePassword = (value: string) => {
        setNicknameData({
            ...nicknameData,
            nickname: value
        })
    }

    const handleSumbit = async () => {
        const { data } = await updateNicknameApi(user.user._id, nicknameData, user.token)
        dispatch(updateOptionsAction(data))
        setIsNickname(false)
    }

    const redirectSettings = () => {
        setIsNickname(false)
    }

    return (
        <View style={authStyles.containerAuth} >
            <View style={authStyles.containerForm}>
                <Input label="Nombre de usuario" value={nickname} handleChange={handleChangePassword} isPassword={false} />
                <View style={authStyles.separator}>
                    <ButtonSettings text="Aceptar" redirect={handleSumbit} />
                    <ButtonSettings text="Regresar" redirect={redirectSettings} />
                </View>
            </View>
        </View>
    )
}

export default ChangeCode