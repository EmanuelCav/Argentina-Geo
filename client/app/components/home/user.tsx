import { View, Text, ImageBackground, StyleSheet } from "react-native";

import { UserInfoProps } from "../../types/props.types";

import { homeStyles } from '../../styles/home.styles';

const User = ({ user, users, games }: UserInfoProps) => {

    const experienceGotStyle = StyleSheet.create({
        experienceGot: {
            width: `${(user.points.levelExperience*100)/(user.level.max)}%`,
            backgroundColor: '#a5b6e9',
            top: 0,
            position: 'absolute',
            left: 0,
            height: '100%',
            borderRadius: 20,
        }
    })

    return (
        <View style={homeStyles.containerUserHome}>
            <View style={homeStyles.userInfoLevel}>
                <Text style={homeStyles.userNickname}>{user.nickname}</Text>
                <Text style={homeStyles.userInfo}>{user.pais.name}</Text>
                <Text style={homeStyles.userInfo} adjustsFontSizeToFit>{user.provincia && user.provincia.name}
                    {user.municipio && (
                        <Text> - {user.municipio.name}</Text>)}
                </Text>
                <Text style={homeStyles.userInfo}>Posición: {users.total!.map((user) => user._id).indexOf(user._id) + 1}°</Text>
                <Text style={homeStyles.userInfo}>Partidas jugadas: {games.length}</Text>
                <View style={homeStyles.containerLevel}>
                    <View style={experienceGotStyle.experienceGot} />
                    <ImageBackground source={require('../../../assets/argentina_bandera_level.png')} style={homeStyles.imageLevel}>
                        <Text style={homeStyles.textLevel}>{user.level.level}</Text>
                    </ImageBackground>
                    <Text style={homeStyles.textExp}>{user.points.levelExperience}/{user.level.max} xp</Text>
                </View>
            </View>
        </View>
    )
}

export default User