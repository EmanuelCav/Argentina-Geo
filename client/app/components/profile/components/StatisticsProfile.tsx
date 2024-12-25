import { Text, View } from 'react-native'

import { ICounterUser } from '../../../interface/User'

import { profileStyles } from '../../../styles/profile.styles'

import { totalCorrects, totalQuestions } from '../../../helper/statistic'

const StatisticsProfile = ({ user }: { user: ICounterUser }) => {
    return (
        <View style={profileStyles.containerMainInfoProfile}>
            <Text style={profileStyles.userInfoProfile}>{user.profile.pais?.name}</Text>
            <Text style={profileStyles.userInfoProfile} adjustsFontSizeToFit>
                {user.profile.provincia && user.profile.provincia.name}
                {(user.profile.municipio && (
                    <Text> - {user.profile.municipio.name}</Text>
                ))
                }
            </Text>
            <Text style={profileStyles.userInfoProfile}>Posición: {user.users.total!.map((u) => u._id).indexOf(user.profile._id) + 1}°</Text>
            <Text style={profileStyles.userInfoProfile}>Puntaje: {user.profile.points?.total}xp</Text>
            <Text style={profileStyles.userInfoProfile}>Mejor puntaje: {user.profile.points?.bestPuntuation}xp</Text>
            <Text style={profileStyles.userInfoProfile}>Preguntas totales: {totalQuestions(user.profile.categories!)}</Text>
            <Text style={profileStyles.userInfoProfile}>Correctas: {totalCorrects(user.profile.categories!)} ({
                totalQuestions(user.profile.categories!) === 0 ? (
                    (totalQuestions(user.profile.categories!)).toFixed(2)
                ) : (
                    ((totalCorrects(user.profile.categories!) * 100) / totalQuestions(user.profile.categories!)).toFixed(2)
                )}%)
            </Text>
        </View>
    )
}

export default StatisticsProfile