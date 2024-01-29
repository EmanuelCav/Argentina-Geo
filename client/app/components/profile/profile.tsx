import { useRef } from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";

import ButtonMenu from "../buttonMenu";
import CategoryUser from "./components/categoryUser";

import { menuStyles } from '../../styles/menu.styles'
import { homeStyles } from '../../styles/home.styles'

import { ProfileProps } from "../../types/props.types";
import { ICategoriesUser } from "../../interface/Game";

import { totalCorrects, totalQuestions } from "../../helper/statistic";

const Profile = ({ user, games, setIsProfile, isConnection }: ProfileProps) => {

    const questions = useRef(totalQuestions(isConnection ? user.profile.categories : user.user.user.categories)).current
    const corrects = useRef(totalCorrects(isConnection ? user.profile.categories : user.user.user.categories)).current

    const cancelProfile = () => {
        setIsProfile(false)
    }

    return (
        <View style={menuStyles.containerCategories} >
            <View style={menuStyles.categoriesContain}>
                <View style={menuStyles.containerScroll}>
                    <ScrollView>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={user.profile.pais.name === "Argentina" ? require('../../../assets/argentina_bandera.png') : require('../../../assets/onu.png' )} 
                            alt="flag" style={{ height: '100%', width: Dimensions.get("window").width / 8 }} />
                            <Text style={menuStyles.textNicknameProfile}>{isConnection ? user.profile.nickname : user.user.user.nickname}</Text>
                        </View>
                        <View style={homeStyles.containerMainInfoProfile}>
                            <Text style={homeStyles.userInfoProfile}>{isConnection ? user.profile.pais.name : user.user.user.pais.name}</Text>
                            <Text style={homeStyles.userInfoProfile} adjustsFontSizeToFit>{isConnection ? (user.profile.provincia && user.profile.provincia.name
                            ) : (
                                user.user.user.provincia && user.user.user.provincia.name
                            )}
                                {isConnection ? (user.profile.municipio && (
                                    <Text> - {user.profile.municipio.name}</Text>
                                )) : (
                                    (user.user.user.municipio && (
                                        <Text> - {user.user.user.municipio.name}</Text>
                                    ))
                                )}
                            </Text>
                            <Text style={homeStyles.userInfoProfile}>Posición: {user.users.total!.map((u) => u._id).indexOf(isConnection ? user.profile._id : user.user.user._id) + 1}°</Text>
                            <Text style={homeStyles.userInfoProfile}>Puntaje: {isConnection ? user.profile.points.total : user.user.user.points.total}xp</Text>
                            <Text style={homeStyles.userInfoProfile}>Mejor puntaje: {isConnection ? user.profile.points.bestPuntuation : user.user.user.points.bestPuntuation}xp</Text>
                            <Text style={homeStyles.userInfoProfile}>
                                {
                                    user.profile._id === user.user.user._id && isConnection &&
                                    <Text>
                                        Partidas jugadas: {games.length}
                                    </Text>
                                }
                            </Text>
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
                                isConnection ? (
                                    user.profile.categories.map((category: ICategoriesUser) => {
                                        return <CategoryUser category={category} key={category._id} />
                                    })
                                ) : (
                                    user.user.user.categories.map((category: ICategoriesUser) => {
                                        return <CategoryUser category={category} key={category._id} />
                                    })
                                )
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Regresar" redirect={cancelProfile} isAccept={true} />
                </View>
            </View>
        </View>
    )
}

export default Profile