import { View } from "react-native";

import ButtonMenu from "../buttonMenu";

import { homeStyles } from "../../styles/home.styles";

import { ShowStatisticsProps } from "../../types/props.types";

const Options = ({ navigation, setIsProfile, isProfile }: ShowStatisticsProps) => {

    const redirectPlay = () => {
        navigation.navigate('Play')
    }

    const showProfile = () => {
        setIsProfile(!isProfile)
    }

    const redirectRanking = () => {
        navigation.navigate('Ranking')
    }

    const redirectSettings = () => {
        navigation.navigate('Settings')
    }

    return (
        <View style={homeStyles.containerUserOption}>
            <ButtonMenu text="Jugar" redirect={redirectPlay} />
            <ButtonMenu text="Estadísticas" redirect={showProfile} />
            <ButtonMenu text="Clasificación" redirect={redirectRanking} />
            <ButtonMenu text="Ajustes" redirect={redirectSettings} />
        </View>
    )
}

export default Options