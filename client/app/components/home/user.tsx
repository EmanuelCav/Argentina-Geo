import { View, Text, Image, Dimensions } from "react-native";

import { UserInfoProps } from "../../types/props.types";

import { homeStyles } from '../../styles/home.styles';

const User = ({ user, users }: UserInfoProps) => {

    return (
        <View style={homeStyles.containerUserHome}>
            <View style={homeStyles.userInfoLevel}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={user.pais.name === "Argentina" ? require('../../../assets/argentina_bandera.png') : require('../../../assets/onu.png')}
                        alt="flag" style={{ height: '100%', width: Dimensions.get("window").width / 8 }} />
                    <Text style={homeStyles.userNickname}>{user.nickname}</Text>
                </View>
                <Text style={homeStyles.userInfo}>{user.pais.name}</Text>
                <Text style={homeStyles.userInfo} adjustsFontSizeToFit>{user.provincia && user.provincia.name}
                    {user.municipio && (
                        <Text> - {user.municipio.name}</Text>
                    )}
                </Text>
                <Text style={homeStyles.userInfo}>Posición: {users.total?.map((user) => user._id).indexOf(user._id)! + 1}°</Text>
            </View>
        </View>
    )
}

export default User