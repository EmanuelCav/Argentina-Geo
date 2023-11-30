import { View } from "react-native";
import { useDispatch } from "react-redux";

import ButtonMenu from "../buttonMenu";

import { getRanking, getUser } from "../../server/actions/user.actions";

import { homeStyles } from "../../styles/home.styles";

import { ShowStatisticsProps } from "../../types/props.types";

const Options = ({ navigation, setIsProfile, user, isConnection, setIsChangeView, isChangeView }: ShowStatisticsProps) => {

    const dispatch = useDispatch()

    const redirectPlay = () => {
        setIsChangeView(!isChangeView)
        navigation.navigate('Play')
    }

    const showProfile = () => {
        if (!isConnection) {
            setIsProfile(true)
            return
        }

        dispatch(getUser({
            id: user.user.user._id,
            user,
            setIsProfile
        }) as any)
    }

    const redirectRanking = () => {
        setIsChangeView(!isChangeView)

        if (!isConnection) {
            navigation.navigate("Ranking")
            return
        }

        dispatch(getRanking({
            user,
            navigation
        }) as any)
    }

    const redirectSettings = () => {
        setIsChangeView(!isChangeView)
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