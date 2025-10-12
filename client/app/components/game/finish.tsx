import { View, Text } from "react-native";

import DataFinish from "./components/finish/DataFinish";
import HelpAdd from "./components/finish/HelpAdd";
import ButtonFinish from "./components/finish/ButtonFinish";

import { gameStyles } from '../../styles/game.styles';

import { FinishPropsType } from "../../types/playing.types";

const Finish = ({ minutes, seconds, corrects, points, navigation, viewErrors,
    areErrors, isGameError, isConnection, changeHelp, isAdd, interstitial,
    isIntersitialLoaded, setIsRecompensadoLoaded }: FinishPropsType) => {

    const navigateHome = () => {

        try {

            if (isConnection) {
                if (isIntersitialLoaded) {
                    interstitial.show();
                }
            }

            setIsRecompensadoLoaded(false)
            navigation.navigate('Home')

        } catch (error) {
            console.error("Error showing interstitial ad or navigate:", error);
            navigation.navigate('Home')
        }
        
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
                    isConnection &&
                    <>
                        {
                            !isAdd ?
                                <HelpAdd changeHelp={changeHelp} />
                                : <Text style={gameStyles.textDataGame}>¡Ayudas entregadas!</Text>
                        }
                    </>
                }
                <ButtonFinish func={navigateHome} />
            </View>
        </View>
    )
}

export default Finish