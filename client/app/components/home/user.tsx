import { View, Text, Image } from "react-native";

import { UserInfoPropsType } from "../../types/home.types";

import { homeStyles } from '../../styles/home.styles';

const User = ({ user, users }: UserInfoPropsType) => {

    return (
        <View style={homeStyles.containerUser}>
            <View style={homeStyles.flagNickname}>
                <Image source={user.pais?.name === "Argentina" ? require('../../../assets/argentina_bandera.png') : require('../../../assets/onu.png')}
                    alt="flag" style={homeStyles.imageHome} />
                <Text style={homeStyles.userNickname}>{user.nickname}</Text>
            </View>
            <Text style={homeStyles.userInfo}>{user.pais?.name}</Text>
            <Text style={homeStyles.userInfo} adjustsFontSizeToFit>{user.provincia && user.provincia.name}
                {user.municipio && (
                    <Text> - {user.municipio.name}</Text>
                )}
            </Text>
            {
                !isNaN(users.total?.map((user) => user._id).indexOf(user._id)! + 1) &&
                <Text style={homeStyles.userInfo}>Posición: {users.total?.map((user) => user._id).indexOf(user._id)! + 1}°</Text>
            }
        </View>
    )
}

export default User