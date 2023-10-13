import { useRef } from "react";
import { View, Text, ImageBackground, ScrollView } from "react-native";

import ButtonMenu from "../buttonMenu";
import CategoryUser from "./components/categoryUser";

import { menuStyles } from '../../styles/menu.styles'
import { homeStyles } from '../../styles/home.styles'

import { ProfileProps } from "../../types/props.types";
import { ICategoriesUser } from "../../interface/Game";

import { totalCorrects, totalQuestions } from "../../helper/statistic";

const Profile = ({ user, games, setIsProfile }: ProfileProps) => {

    const questions = useRef(totalQuestions(user.profile.categories)).current
    const corrects = useRef(totalCorrects(user.profile.categories)).current

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
                        <View style={homeStyles.containerMainInfoProfile}>
                            <Text style={homeStyles.userInfoProfile}>{user.profile.pais.name}</Text>
                            <Text style={homeStyles.userInfoProfile} adjustsFontSizeToFit>{user.profile.provincia && user.profile.provincia.name}
                                {user.profile.municipio && (
                                    <Text> - {user.profile.municipio.name}</Text>)}
                            </Text>
                            <Text style={homeStyles.userInfoProfile}>Posición: {user.users.total!.map((u) => u._id).indexOf(user.user.user._id) + 1}°</Text>
                            <Text style={homeStyles.userInfoProfile}>Partidas jugadas: {games.length}</Text>
                            <Text style={homeStyles.userInfoProfile}>Preguntas totales: {questions}</Text>
                            <Text style={homeStyles.userInfoProfile}>Correctas: {corrects} ({
                                questions === 0 ? (
                                    (questions).toFixed(2)
                                ) : (
                                    ((corrects * 100) / questions).toFixed(2)
                                )}%)
                            </Text>
                        </View>
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
                    <ButtonMenu text="Aceptar" redirect={cancelProfile} isAccept={true} isCategory={false} />
                </View>
            </View>
        </View>
    )
}

export default Profile