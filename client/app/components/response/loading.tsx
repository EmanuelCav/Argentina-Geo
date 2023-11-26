import { View, Image, ImageBackground } from "react-native";
import { useSelector } from 'react-redux';

import { IReducer } from "../../interface/Reducer";

import { responseStyles } from '../../styles/response.styles';

import { selector } from "../../helper/selector";

const Loading = () => {

    const response = useSelector((state: IReducer) => selector(state).response)

    return (
        <>
            {
                response.loading &&
                <View style={responseStyles.containerMainLoading}>
                    <ImageBackground source={require('../../../assets/fondo2.png')} style={responseStyles.containerLoading} resizeMode="cover">
                        <Image source={require('../../../assets/loading.gif')} style={responseStyles.loadingIcon} resizeMode="center" />
                    </ImageBackground>
                </View>
            }
        </>
    )
}

export default Loading