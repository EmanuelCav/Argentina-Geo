import { View, Text, Image, Dimensions } from "react-native";

import { homeStyles } from '../../styles/home.styles';

const UserNoConnection = () => {
    return (
        <View style={homeStyles.containerUserHome}>
            <View style={homeStyles.userInfoLevel}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../assets/argentina_bandera.png')} 
                    alt="flag" style={{ height: '100%', width: Dimensions.get("window").width / 8 }} />
                    <Text style={homeStyles.userNickname}>Invitado</Text>
                </View>
                <Text style={homeStyles.userInfo}>Argentna</Text>
            </View>
        </View>
    )
}

export default UserNoConnection