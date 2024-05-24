import { View, Text } from "react-native";

import ButtonMenu from "../ButtonMenu";
import DataFinish from "./components/finish/DataFinish";
import HelpAdd from "./components/finish/HelpAdd";

import { gameStyles } from '../../styles/game.styles';
import { homeStyles } from '../../styles/home.styles';

import { FinishPropsType } from "../../types/props.types";

const Finish = ({ minutes, seconds, corrects, points, navigation, viewErrors, areErrors, isGameError, isConnection, changeHelp, isAdd, interstitial, isRecompensadoLoaded, isIntersitialLoaded, setIsRecompensadoLoaded }: FinishPropsType) => {

    const navigateHome = () => {
        if (isConnection) {
            if (interstitial.loaded && isIntersitialLoaded) {
                interstitial.show();
            }
        }

        setIsRecompensadoLoaded(false)
        navigation.navigate('Home')
    }

    return (
        <View style={gameStyles.containerFinish}>
            <View style={gameStyles.containFinish}>
                {
                    isConnection && <DataFinish minutes={minutes} seconds={seconds} corrects={corrects} points={points} isGameError={isGameError} />
                }
                {
                    areErrors && <Text style={gameStyles.textErrorsGame} onPress={viewErrors}>Repasar errores</Text>
                }
                {
                    isConnection && isRecompensadoLoaded &&
                    <>
                        {
                            !isAdd ?
                                <HelpAdd changeHelp={changeHelp} />
                                : <Text style={gameStyles.textErrorsGame}>¡Ayudas entregadas!</Text>
                        }
                    </>
                }
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Continuar" redirect={navigateHome} isAccept={true} disabled={false} />
                </View>
            </View>
        </View>
    )
}

export default Finish