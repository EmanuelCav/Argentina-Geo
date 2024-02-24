import { useState } from "react";
import { View } from 'react-native'

import ButtonSettings from "./components/ButtonSettings";
import Input from "./components/Input";
import Error from '../../response/Error';

import { auth } from "../../../server/actions/user.actions";

import { authStyles } from '../../../styles/settings.styles'

import { ILogin } from "../../../interface/User";
import { NewProps } from "../../../types/props.types";

const Auth = ({ navigation, setIsAuth, dispatch }: NewProps) => {

    const initialState: ILogin = {
        nickname: "",
        password: ""
    }

    const [message, setMessage] = useState<string>("")
    const [userData, setUserData] = useState<ILogin>(initialState)

    const { nickname, password } = userData

    const handleChangeNickname = (value: string) => {
        setUserData({
            ...userData,
            nickname: value
        })
    }

    const handleChangePassword = (value: string) => {
        setUserData({
            ...userData,
            password: value
        })
    }

    const handleSumbit = async () => {
        dispatch(auth({
            userData,
            setIsAuth,
            setMessage,
            setUserData,
            navigation
        }) as any)
    }

    const redirectNew = () => {
        setIsAuth(false)
    }

    return (
        <View style={authStyles.containerAuth} >
            <View style={authStyles.containerForm}>
                <Error msg={message} />
                <Input label="Nombre de usuario" value={nickname} handleChange={handleChangeNickname} isPassword={false} />
                <Input label="Código de entrada" value={password} handleChange={handleChangePassword} isPassword={true} />
                <View style={authStyles.separator}>
                    <ButtonSettings text="Aceptar" styles={null} redirect={handleSumbit} />
                    <ButtonSettings text="Regresar" styles={null} redirect={redirectNew} />
                </View>
            </View>
        </View>
    )
}

export default Auth