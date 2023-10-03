import { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux'

import ButtonMenu from "../components/buttonMenu";
import Categories from "../components/categories/categories";

import { createGameApi } from '../server/api/game.api'
import { createGameAction, getGameAction } from '../server/features/game.features'

import { StackNavigation } from "../types/props.types";
import { IReducer } from "../interface/Reducer";

import { homeStyles } from "../styles/home.styles";

import { selector } from "../helper/selector";
import OptionsGame from "../components/options/options";

const Play = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const [isCategories, setIsCategories] = useState<boolean>(false)
    const [isOptionsGame, setIsOptionsGame] = useState<boolean>(false)

    const generateGame = async () => {

        try {
            // const { data } = await createGameApi(users.user.token)
            // dispatch(createGameAction(data))
            // dispatch(getGameAction(data))
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
        <View style={homeStyles.containerPlay}>
            {
                isCategories && <Categories user={users.user} categories={users.user.user.categories} setIsCategories={setIsCategories} />
            }
            {
                isOptionsGame && <OptionsGame setIsOptionsGame={setIsOptionsGame} />
            }
            <View style={homeStyles.containerMenuButtons}>
                <ButtonMenu text="Iniciar juego" redirect={generateGame} isAccept={false} isCategory={false} />
                <ButtonMenu text="Categorías" redirect={showCategories} isAccept={false}
                    isCategory={users.user.user.categories.filter((u) => u.isUnlocked).length !== users.user.user.level.level ? true : false} />
                <ButtonMenu text="Opciones" redirect={showOptions} isAccept={false} isCategory={false} />
                <ButtonMenu text="Regresar" redirect={() => navigation.goBack()} isAccept={false} isCategory={false} />
            </View>
        </View>
    )
}

export default Play