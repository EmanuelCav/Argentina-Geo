import { View } from "react-native";
import { useDispatch } from "react-redux";

import ButtonMenu from "../general/ButtonMenu";

import { getRanking, getUser } from "../../server/actions/user.actions";

import { generalStyles } from "../../styles/general.styles";

import { MenuPropsType } from "../../types/home.types";

const Menu = ({ navigation, user, isConnection, setIsChangeView, isChangeView }: MenuPropsType) => {

    const dispatch = useDispatch()

    const redirectPlay = () => {
        setIsChangeView(!isChangeView)
        navigation.navigate('Play')
    }

    const redirectProfile = () => {
        setIsChangeView(!isChangeView)
        dispatch(getUser({
            id: user.user.user?._id!,
            user,
            navigation
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
        <View style={generalStyles.containerMenu}>
            <ButtonMenu text="JUGAR" redirect={redirectPlay} disabled={false} />
            <ButtonMenu text="ESTADÍSTICAS" redirect={redirectProfile} disabled={!isConnection} />
            <ButtonMenu text="CLASIFICACIÓN" redirect={redirectRanking} disabled={!isConnection} />
            {/* <ButtonMenu text="TIENDA" redirect={redirectTent} disabled={!isConnection} /> */}
            <ButtonMenu text="AJUSTES" redirect={redirectSettings} disabled={!isConnection} />
        </View>
    )
}

export default Menu