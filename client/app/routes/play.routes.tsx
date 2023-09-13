import { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux'

import ButtonMenu from "../components/buttonMenu";
import Categories from "../components/categories/categories";

import { createGameApi } from '../server/api/game.api'
import { createGameAction, getGameAction } from '../server/features/game.features'

import { StackNavigation } from "../types/props.types";
import { IReducer } from "../interface/Reducer";

import { menuStyles } from "../styles/menu.styles";

import { selector } from "../helper/selector";
import OptionsGame from "../components/options/options";

const Play = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const dispatch = useDispatch()

    const [isCategories, setIsCategories] = useState<boolean>(false)
    const [isOptionsGame, setIsOptionsGame] = useState<boolean>(false)

    const [categories, setCategories] = useState<string[]>([])

    const generateGame = async () => {

        try {
            const { data } = await createGameApi(users.user.token)
            dispatch(createGameAction(data))
            dispatch(getGameAction(data))
            navigation.navigate('Playing')
        } catch (error) {
            console.log(error);
        }
    }

    const showCategories = () => {
        setIsCategories(!isCategories)
    }

    const showOptions = () => {
        setIsOptionsGame(!isOptionsGame)
    }

    return (
        <View style={menuStyles.containerPlay}>
            <ButtonMenu text="Iniciar juego" redirect={generateGame} />
            <ButtonMenu text="Categorías" redirect={showCategories} />
            <ButtonMenu text="Opciones" redirect={showOptions} />
            <ButtonMenu text="Regresar" redirect={() => navigation.goBack()} />
            {
                isCategories && <Categories categories={users.user.user.categories} setIsCategories={setIsCategories} />
            }
            {
                isOptionsGame && <OptionsGame setIsOptionsGame={setIsOptionsGame} />
            }
        </View>
    )
}

export default Play