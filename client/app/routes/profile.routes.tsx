import { View } from "react-native"
import { useSelector } from "react-redux"

import ButtonAccept from "../components/general/ButtonAccept"
import InfoProfile from "../components/profile/InfoProfile"
import Container from "../Container"

import { profileStyles } from "../styles/profile.styles"

import { IReducer } from "../interface/Reducer"
import { StackNavigation } from "../types/props.types"

import { selector } from "../helper/selector"

const Profile = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    return (
        <Container>
            <View style={profileStyles.profileContain}>
                <InfoProfile user={users} />
            </View>
            <ButtonAccept isCategory={false} text="REGRESAR" func={() => navigation.goBack()} />
        </Container>
    )
}

export default Profile