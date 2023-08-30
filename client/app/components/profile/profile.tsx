import { useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { useDispatch } from 'react-redux'

import ButtonMenu from "../buttonMenu";

import { userApi } from "../../server/api/user.api";
import { getUserAction } from "../../server/features/user.features";

import { menuStyles } from '../../styles/menu.styles'
import { homeStyles } from '../../styles/home.styles'

import { ProfileProps } from "../../types/props.types";

const Profile = ({ user, games, id, setIsProfile }: ProfileProps) => {

    const dispatch = useDispatch()

    const getData = async () => {
        const { data } = await userApi(id, user.user.token)
        dispatch(getUserAction(data))
    }

    useEffect(() => {
        getData()
    }, [dispatch])

    const cancelProfile = () => {
        setIsProfile(false)
    }

    return (
        <View style={menuStyles.containerCategories} >
            <View style={menuStyles.categoriesContain}>
                <View>
                    <ImageBackground source={require('../../../assets/argentina_bandera_level.png')} style={homeStyles.imageLevelProfile}>
                        <Text style={homeStyles.textLevel}>{user.profile.level}</Text>
                    </ImageBackground>
                    <Text style={homeStyles.userNickname}>{user.profile.nickname}</Text>
                    <Text style={homeStyles.userInfo}>{user.profile.pais.name}</Text>
                    <View style={homeStyles.containerLocationUser}>
                        <Text style={homeStyles.userInfo}>{user.profile.provincia !== null && user.profile.provincia.name}</Text>
                        <Text style={homeStyles.userInfo}>{user.profile.municipio !== null && - user.profile.municipio.name}</Text>
                    </View>
                    <Text style={homeStyles.userInfo}>Posición: {user.users.map((u) => u._id).indexOf(user.user.user._id) + 1}°</Text>
                    <Text style={homeStyles.userInfo}>Partidas jugadas: {games.length}</Text>
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Aceptar" redirect={cancelProfile} />
                </View>
            </View>
        </View>
    )
}

export default Profile