import { useEffect } from 'react';
import { View, Text } from "react-native";
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { INTERSTITIAL_FINISH_ID } from '@env';

import Time from "./components/time";
import ButtonMenu from "../buttonMenu";

import { gameStyles } from '../../styles/game.styles';
import { homeStyles } from '../../styles/home.styles';

import { FinishProps } from "../../types/props.types";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${INTERSTITIAL_FINISH_ID}`;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

const Finish = ({ minutes, seconds, corrects, points, navigation, viewErrors, areErrors, isGameError, isConnection }: FinishProps) => {

    const navigateHome = () => {
        if (isConnection) {
            interstitial.show();
        }
        navigation.navigate('Home')
    }

    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            console.log("Loading add");
        });

        interstitial.load();

        return unsubscribe;
    }, []);

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