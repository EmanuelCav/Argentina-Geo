import { Image, Modal, ImageBackground } from "react-native"

import { responseStyles } from "../../styles/response.styles"

const LoadingSplash = () => {

    return (
        <Modal
            visible
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <ImageBackground source={require('../../../assets/fondo2.png')} style={responseStyles.containerMainLoading} resizeMode="cover">
                <Image source={require('../../../assets/loading.gif')} style={responseStyles.loadingIcon} resizeMode="center" />
            </ImageBackground>
        </Modal>
    )
}

export default LoadingSplash