import { View } from "react-native"
import { useSelector } from "react-redux"

import ButtonAccept from "../components/general/ButtonAccept"
import InfoProfile from "../components/profile/InfoProfile"

import { generalStyles } from "../styles/general.styles"

import { IReducer } from "../interface/Reducer"
import { StackNavigation } from "../types/props.types"

import { selector } from "../helper/selector"
import { profileStyles } from "../styles/profile.styles"

const Profile = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    return (
        <View style={generalStyles.containerGeneral}>
            <View style={profileStyles.profileContain}>
                <InfoProfile user={users} />
            </View>
            <ButtonAccept isCategory={false} text="REGRESAR" func={() => navigation.goBack()} />
        </View>
    )
}

export default Profile