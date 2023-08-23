import { useState, useEffect } from "react";
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

const Play = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const dispatch = useDispatch()

    const [isCategories, setIsCategories] = useState<boolean>(false)
    const [categories, setCategories] = useState<string[]>([])

    const generateGame = async () => {

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

    const showCategories = () => {

        let arrCategories: string[] = []

        for (let i = 0; i < users.profile.categories.length; i++) {
            arrCategories.push(users.profile.categories[i].name)
        }
        for (let i = 0; i < games.categories.length; i++) {
            arrCategories.push(games.categories[i].name)
        }

        setCategories(arrCategories)
        setIsCategories(!isCategories)
    }

    return (
        <View style={menuStyles.containerPlay}>
            <ButtonMenu text="Iniciar juego" redirect={generateGame} />
            <ButtonMenu text="Categorías" redirect={showCategories} />
            <ButtonMenu text="Opciones" redirect={() => navigation.navigate('Home')} />
            <ButtonMenu text="Regresar" redirect={() => navigation.goBack()} />
            {
                isCategories && <Categories categories={categories} />
            }
        </View>
    )
}

export default Play