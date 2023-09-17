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
            <View style={homeStyles.containerMenuButtons}>
                <ButtonMenu text="Jugar" redirect={redirectPlay} isAccept={false} />
                <ButtonMenu text="Estadísticas" redirect={showProfile} isAccept={false} />
                <ButtonMenu text="Clasificación" redirect={redirectRanking} isAccept={false} />
                <ButtonMenu text="Ajustes" redirect={redirectSettings} isAccept={false} />
            </View>
        </View>
    )
}

export default Options