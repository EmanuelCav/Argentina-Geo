import { View } from "react-native";

import Container from '../Container'
import ButtonMenu from "../components/buttonMenu";

import { StackNavigation } from "../types/props.types";

import { menuStyles } from "../styles/menu.styles";

const Play = ({ navigation }: { navigation: StackNavigation }) => {

    return (
        <Container>
            <View style={menuStyles.containerPlay}>
                <ButtonMenu text="Inicial Juego" redirect={() => navigation.navigate('Home')} />
                <ButtonMenu text="Categorías" redirect={() => navigation.navigate('Home')} />
                <ButtonMenu text="Opciones" redirect={() => navigation.navigate('Home')} />
                <ButtonMenu text="Regresar" redirect={() => navigation.goBack()} />
            </View>
        </Container>
    )
}

export default Play