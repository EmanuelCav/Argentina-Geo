import { useState } from "react";
import { View } from 'react-native'
import { useDispatch } from "react-redux";

import ButtonSettings from "./components/buttonSettings";
import Input from "./components/input";

import { loginApi } from '../../../server/api/user.api'
import { loginAction } from '../../../server/features/user.features'

import { authStyles } from '../../../styles/settings.styles'

import { ILogin } from "../../../interface/User";
import { NewProps } from "../../../types/props.types";

const Auth = ({ navigation, setIsAuth }: NewProps) => {

    const dispatch = useDispatch()

    const initialState: ILogin = {
        nickname: "",
        password: ""
    }

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

        try {
            const { data } = await loginApi(userData)
            dispatch(loginAction(data))
            setIsAuth(false)
            navigation.navigate('Home')
        } catch (error) {
            console.log(error);
            setUserData({
                nickname: "",
                password: ""
            })
        }
    }

    const redirectNew = () => {
        setIsAuth(false)
    }

    return (
        <View style={authStyles.containerAuth} >
            <View style={authStyles.containerForm}>
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