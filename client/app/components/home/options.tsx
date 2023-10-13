import { View } from "react-native";
import { useDispatch } from "react-redux";

import ButtonMenu from "../buttonMenu";

import { getUser } from "../../server/actions/user.actions";

import { homeStyles } from "../../styles/home.styles";

import { ShowStatisticsProps } from "../../types/props.types";

const Options = ({ navigation, setIsProfile, user }: ShowStatisticsProps) => {

    const dispatch = useDispatch()

    const redirectPlay = () => {
        navigation.navigate('Play')
    }

    const showProfile = () => {
        dispatch(getUser({
            id: user.user.user._id,
            user,
            setIsProfile
        }) as any)
    }

    const redirectRanking = () => {
        navigation.navigate('Ranking')
    }

    const redirectSettings = () => {
        navigation.navigate('Settings')
    }

    return (
        <View style={homeStyles.containerUserOption}>
            <View style={homeStyles.containerMenuButtons}>
                <ButtonMenu text="Jugar" redirect={redirectPlay} isAccept={false} isCategory={false} />
                <ButtonMenu text="Estadísticas" redirect={showProfile} isAccept={false} isCategory={false} />
                <ButtonMenu text="Clasificación" redirect={redirectRanking} isAccept={false} isCategory={false} />
                <ButtonMenu text="Ajustes" redirect={redirectSettings} isAccept={false} isCategory={false} />
            </View>
        </View>
    )
}

export default Options