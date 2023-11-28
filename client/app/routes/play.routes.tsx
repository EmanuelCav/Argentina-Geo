import { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { fetch } from "@react-native-community/netinfo";

import ButtonMenu from "../components/buttonMenu";
import Categories from "../components/categories/categories";
import OptionsGame from "../components/options/options";
import Error from '../components/response/error';

import { game } from "../server/actions/game.actions";

import { StackNavigation } from "../types/props.types";
import { IReducer } from "../interface/Reducer";
import { IGame, IQuestion } from "../interface/Game";

import { homeStyles } from "../styles/home.styles";

import { selector } from "../helper/selector";
import { gameWithoutInternet } from "../helper/generator";

const Play = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const dispatch = useDispatch()

    const [isCategories, setIsCategories] = useState<boolean>(false)
    const [isOptionsGame, setIsOptionsGame] = useState<boolean>(false)
    const [isConnection, setIsConnection] = useState<boolean | null>(true)

    const [message, setMessage] = useState<string>("")

    const generateGame = async () => {

        if (!isConnection) {

            const allGames = games.games.map((game: IGame) => game.questions.filter((question: IQuestion) => question.question.text)).filter(arr => arr.length > 0)

            if(gameWithoutInternet(allGames).length >= 5) {
                navigation.navigate('Playing')
            }
            
            return
        }

        dispatch(game({
            token: users.user.token,
            navigation,
            setMessage
        }) as any)
    }

    const showCategories = () => {
        setIsCategories(!isCategories)
        setMessage("")
    }

    const showOptions = () => {
        setIsOptionsGame(!isOptionsGame)
        setMessage("")
    }

    const back = () => {
        navigation.goBack()
    }

    useEffect(() => {
        fetch().then(conn => conn).then(state => setIsConnection(state.isConnected));
    }, [isConnection])


    return (
        <View style={homeStyles.containerPlay}>
            {
                isCategories && <Categories user={users.user} categories={users.user.user.categories} setIsCategories={setIsCategories} isConnection={isConnection} />
            }
            {
                isOptionsGame && <OptionsGame setIsOptionsGame={setIsOptionsGame} isConnection={isConnection} />
            }
            <View style={homeStyles.containerMenuButtons}>
                <Error msg={message} />
                <ButtonMenu text="Iniciar juego" redirect={generateGame} isAccept={false} isCategory={false} />
                <ButtonMenu text="Categorías" redirect={showCategories} isAccept={false}
                    isCategory={users.user.user.categories.filter((u) => u.isUnlocked).length !== users.user.user.level.level ? true : false} />
                <ButtonMenu text="Opciones" redirect={showOptions} isAccept={false} isCategory={false} />
                <ButtonMenu text="Regresar" redirect={back} isAccept={false} isCategory={false} />
            </View>
        </View>
    )
}

export default Play