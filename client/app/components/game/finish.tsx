import { View, Text } from "react-native";

import ButtonMenu from "../ButtonMenu";
import DataFinish from "./components/finish/DataFinish";

import { gameStyles } from '../../styles/game.styles';
import { homeStyles } from '../../styles/home.styles';

import { FinishPropsType } from "../../types/props.types";

const Finish = ({ minutes, seconds, corrects, points, navigation, viewErrors, areErrors, isGameError, isConnection, interstitial }: FinishPropsType) => {

    const navigateHome = () => {
        if (isConnection) {
            // interstitial.show();
        }
        navigation.navigate('Home')
    }

    return (
        <View style={gameStyles.containerFinish}>
            <DataFinish minutes={minutes} seconds={seconds} corrects={corrects} points={points} isGameError={isGameError} />
            {
                areErrors && <Text style={gameStyles.textErrorsGame} onPress={viewErrors}>Repasar errores</Text>
            }
            <View style={homeStyles.containerActionsView}>
                <ButtonMenu text="Continuar" redirect={navigateHome} isAccept={true} />
            </View>
        </View>
    )
}

export default Finish