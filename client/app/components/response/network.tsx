import { View, Text, BackHandler, Dimensions } from 'react-native'

import { homeStyles } from '../../styles/home.styles'
import { gameStyles } from '../../styles/game.styles'

import { InternetType } from '../../types/response.types'

import ButtonMenu from '../ButtonMenu'
import { responseStyles } from '../../styles/response.styles'

const Network = ({ firstTime, setIsInternet }: InternetType) => {

    const exit = () => {
        if (firstTime) {
            BackHandler.exitApp()
            return
        }

        setIsInternet(false)
    }

    return (
        <View style={responseStyles.containerNetwork}>
            <View style={gameStyles.containerFinish}>
                <Text style={[gameStyles.textDataGame, { marginBottom: Dimensions.get("window").height / 105.71 }]}>
                    Usted no esta conectado a internet. Es posible que algunas funciones no se ejecuten correctamente
                </Text>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Continuar" redirect={exit} isAccept={true} />
                </View>
            </View>
        </View>
    )
}

export default Network