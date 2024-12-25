import { View, Text, Image } from "react-native";

import { homeStyles } from '../../styles/home.styles';

const UserNoConnection = () => {
    return (
        <View style={homeStyles.containerUser}>
            <View style={homeStyles.flagNickname}>
                <Image source={require('../../../assets/argentina_bandera.png')}
                    alt="flag" style={homeStyles.imageHome} />
                <Text style={homeStyles.userNickname}>Invitado</Text>
            </View>
            <Text style={homeStyles.userInfo}>Argentina</Text>
        </View>
    )
}

export default UserNoConnection