import { View, Text } from "react-native";

import Time from "./components/time";
import ButtonMenu from "../buttonMenu";

import { gameStyles } from '../../styles/game.styles';
import { homeStyles } from '../../styles/home.styles';

import { FinishProps } from "../../types/props.types";

const Finish = ({ minutes, seconds, corrects, points, navigation, viewErrors, areErrors, isGameError, isConnection, interstitial }: FinishProps) => {

    const navigateHome = () => {
        if (isConnection) {
            // interstitial.show();
        }
        navigation.navigate('Home')
    }

    return (
        <View style={gameStyles.containerFinish}>
            <View style={gameStyles.containerDataFinish}>
                {
                    isGameError ? (
                        <Text style={gameStyles.textDataGame}>¡Repaso realizado!</Text>
                    ) : (
                        <View>
                            {
                                isConnection &&
                                <Text style={gameStyles.textDataGame}>Respuestas correctas: {corrects}</Text>
                            }
                            <Time seconds={seconds} minutes={minutes} specialText="Tiempo: " />
                            <Text style={gameStyles.textDataGame}>Total de puntos: {points}xp</Text>
                        </View>
                    )
                }
                {
                    areErrors && <Text style={gameStyles.textErrorsGame} onPress={viewErrors}>Repasar errores</Text>
                }
            </View>
            <View style={homeStyles.containerActionsView}>
                <ButtonMenu text="Continuar" redirect={navigateHome} isAccept={true} isCategory={false} />
            </View>
        </View>
    )
}

export default Finish