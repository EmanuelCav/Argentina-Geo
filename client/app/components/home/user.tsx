import { View, Text, ImageBackground } from "react-native";

import { UserInfoProps } from "../../types/props.types";

import { homeStyles } from '../../styles/home.styles';

const User = ({ user, users, games }: UserInfoProps) => {

    return (
        <View style={homeStyles.containerUserHome}>
            <View style={homeStyles.userInfoLevel}>
                <Text style={homeStyles.userNickname}>{user.nickname}</Text>
                <Text style={homeStyles.userInfo}>{user.pais.name}</Text>
                <View style={homeStyles.containerLocationUser}>
                    <Text style={homeStyles.userInfo}>{user.provincia && user.provincia.name} - </Text>
                    <Text style={homeStyles.userInfo}>{user.municipio && user.municipio.name}</Text>
                </View>
                <Text style={homeStyles.userInfo}>Posición: {users.map((user) => user._id).indexOf(user._id) + 1}°</Text>
                <Text style={homeStyles.userInfo}>Partidas jugadas: {games.length}</Text>
                <View style={homeStyles.containerLevel}>
                    <ImageBackground source={require('../../../assets/argentina_bandera_level.png')} style={homeStyles.imageLevel}>
                        <Text style={homeStyles.textLevel}>{user.level.level}</Text>
                    </ImageBackground>
                    <Text style={homeStyles.textExp}>{user.points.total}/{user.level.max} xp</Text>
                </View>
            </View>
        </View>
    )
}

export default User