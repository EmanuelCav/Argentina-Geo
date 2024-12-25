import { useState } from "react";
import { View } from "react-native";
import { useDispatch } from 'react-redux'

import Input from "./components/components/Input";
import ButtonSettings from "./components/components/ButtonSettings";
import Error from "../response/Error";

import { updateNicknameApi } from '../../server/api/user.api'
import { updateOptionsAction } from '../../server/features/user.features'

import { INickname } from "../../interface/User";
import { ChangeNicknamePropsType } from "../../types/settings.types";

import { settingsStyles } from '../../styles/settings.styles'

const ChangeCode = ({ setIsNickname, user }: ChangeNicknamePropsType) => {

    const dispatch = useDispatch()

    const initialState: INickname = {
        nickname: user.user?.nickname!
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
            const { data } = await updateNicknameApi(user.user?._id!, nicknameData, user.token!)
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
        <View style={settingsStyles.containerAuth} >
            <View style={settingsStyles.containerForm}>
                {
                    message && <Error msg={message} />
                }
                <Input label="Nombre de usuario" value={nickname} handleChange={handleChangePassword} isPassword={false} />
                <View style={settingsStyles.separator}>
                    <ButtonSettings text="Aceptar" redirect={handleSumbit} />
                    <ButtonSettings text="Regresar" redirect={redirectSettings} />
                </View>
            </View>
        </View>
    )
}

export default ChangeCode