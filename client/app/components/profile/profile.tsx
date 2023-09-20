import { useEffect, useState } from "react";
import { View, Text, ImageBackground, ScrollView } from "react-native";
import { useDispatch } from 'react-redux'

import ButtonMenu from "../buttonMenu";
import CategoryUser from "./components/categoryUser";

import { userApi } from "../../server/api/user.api";
import { getUserAction } from "../../server/features/user.features";

import { menuStyles } from '../../styles/menu.styles'
import { homeStyles } from '../../styles/home.styles'

import { ProfileProps } from "../../types/props.types";
import { ICategoriesUser } from "../../interface/Game";

import { totalCorrects, totalQuestions } from "../../helper/statistic";

const Profile = ({ user, games, id, setIsProfile }: ProfileProps) => {

    const dispatch = useDispatch()

    const [questions, setQuestions] = useState<number>(0)
    const [corrects, setCorrects] = useState<number>(0)

    const getData = async () => {
        const { data } = await userApi(id, user.user.token)
        dispatch(getUserAction(data))
    }

    useEffect(() => {

        setQuestions(totalQuestions(user.profile.categories))
        setCorrects(totalCorrects(user.profile.categories))

        getData()
    }, [dispatch])

    const cancelProfile = () => {
        setIsProfile(false)
    }

    return (
        <View style={menuStyles.containerCategories} >
            <View style={menuStyles.categoriesContain}>
                <View style={menuStyles.containerScroll}>
                    <ScrollView>
                        <View style={menuStyles.containFlagNickname}>
                            <ImageBackground source={require('../../../assets/argentina_bandera_level.png')} style={homeStyles.imageLevelProfile}>
                                <Text style={homeStyles.textLevel}>{user.profile.level.level}</Text>
                            </ImageBackground>
                            <Text style={menuStyles.textNicknameProfile}>{user.profile.nickname}</Text>
                        </View>
                        <Text style={homeStyles.userInfo}>{user.profile.pais.name}</Text>
                        <View style={homeStyles.containerLocationUser}>
                            <Text style={homeStyles.userInfo}>{user.profile.provincia && user.profile.provincia.name}</Text>
                            <Text style={homeStyles.userInfo}>{user.profile.municipio && - user.profile.municipio.name}</Text>
                        </View>
                        <Text style={homeStyles.userInfo}>Posición: {user.users.map((u) => u._id).indexOf(user.user.user._id) + 1}°</Text>
                        <Text style={homeStyles.userInfo}>Partidas jugadas: {games.length}</Text>
                        <Text style={homeStyles.userInfo}>Preguntas totales: {questions}</Text>
                        <Text style={homeStyles.userInfo}>Respuestas correctas: {corrects} ({
                            questions === 0 ? (
                                (questions).toFixed(2)
                            ) : (
                                ((corrects * 100) / questions).toFixed(2)
                            )
                        }%)</Text>
                        <View>
                            {
                                user.profile.categories.map((category: ICategoriesUser) => {
                                    return <CategoryUser category={category} key={category._id} />
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Aceptar" redirect={cancelProfile} isAccept={true} />
                </View>
            </View>
        </View>
    )
}

export default Profile