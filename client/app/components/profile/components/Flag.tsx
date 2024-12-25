import { Dimensions, Image, Text, View } from 'react-native'

import { profileStyles } from '../../../styles/profile.styles'

import { IUser } from '../../../interface/User'

const Flag = ({ profile }: { profile: IUser }) => {
    return (
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <Image source={profile.pais?.name === "Argentina" ? require('../../../../assets/argentina_bandera.png') : require('../../../../assets/onu.png')}
                alt="flag" style={{ height: '100%', width: Dimensions.get("window").width / 8 }} />
            <Text style={profileStyles.textNicknameProfile}>{profile.nickname}</Text>
        </View>
    )
}

export default Flag