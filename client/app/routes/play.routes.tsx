import { View } from "react-native";
import { useDispatch } from 'react-redux'

import ButtonMenu from "../components/buttonMenu";

import { createGameApi } from '../server/api/game'
import { createGameAction, getGameAction } from '../server/features/game.features'

import { StackNavigation } from "../types/props.types";

import { menuStyles } from "../styles/menu.styles";

const Play = ({ navigation }: { navigation: StackNavigation }) => {

    const dispatch = useDispatch()

    const getData = async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGU0YTFmNzExNWJmYWZjNTM1ZWFlNCIsImlhdCI6MTY5MjI5MzEyOSwiZXhwIjoxNjk0ODg1MTI5fQ.SUJFgqUomvhsvE1EPLSx9rTrAUbJa39z7fWUqYESHO8"

        try {
            const { data } = await createGameApi(token)
            dispatch(createGameAction(data))
            dispatch(getGameAction(data))
            navigation.navigate('Playing')
        } catch (error) {
            console.log(error);
        }
    }

    const generateGame = () => {
        getData()
    }

    return (
        <View style={menuStyles.containerPlay}>
            <ButtonMenu text="Iniciar juego" redirect={generateGame} />
            <ButtonMenu text="Categorías" redirect={() => navigation.navigate('Home')} />
            <ButtonMenu text="Opciones" redirect={() => navigation.navigate('Home')} />
            <ButtonMenu text="Regresar" redirect={() => navigation.goBack()} />
        </View>
    )
}

export default Play