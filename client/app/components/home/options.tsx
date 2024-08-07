import { View } from "react-native";
import { useDispatch } from "react-redux";

import ButtonMenu from "../ButtonMenu";

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
        dispatch(getUser({
            id: user.user.user._id,
            user,
            setIsProfile
        }) as any)
    }

    const redirectRanking = () => {
        setIsChangeView(!isChangeView)

        dispatch(getRanking({
            user,
            navigation
        }) as any)
    }

    const redirectTent = () => {
        navigation.navigate('Tent')
    }

    const redirectSettings = () => {
        setIsChangeView(!isChangeView)
        navigation.navigate('Settings')
    }

    return (
        <View style={homeStyles.containerMenuButtons}>
            <ButtonMenu text="Jugar" redirect={redirectPlay} isAccept={false} disabled={false} />
            <ButtonMenu text="Estadísticas" redirect={showProfile} isAccept={false} disabled={!isConnection} />
            <ButtonMenu text="Clasificación" redirect={redirectRanking} isAccept={false} disabled={!isConnection} />
            <ButtonMenu text="Tienda" redirect={redirectTent} isAccept={false} disabled={!isConnection} />
            <ButtonMenu text="Ajustes" redirect={redirectSettings} isAccept={false} disabled={!isConnection} />
        </View>
    )
}

export default Options