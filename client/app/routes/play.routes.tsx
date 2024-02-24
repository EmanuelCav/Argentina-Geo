import { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { fetch } from "@react-native-community/netinfo";
import { useRoute } from '@react-navigation/native';
// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
// import { BANNER_PLAY_ID } from "@env";

import ButtonMenu from "../components/ButtonMenu";
import Categories from "../components/categories/Categories";
import OptionsGame from "../components/options/Options";
import Error from '../components/response/Error';

import { game } from "../server/actions/game.actions";

import { StackNavigation } from "../types/props.types";
import { IReducer } from "../interface/Reducer";
import { IGame, IQuestion } from "../interface/Game";

import { homeStyles } from "../styles/home.styles";

import { selector } from "../helper/selector";
import { gameWithoutInternet } from "../helper/generator";

// const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : `${BANNER_PLAY_ID}`;

const Play = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const dispatch = useDispatch()
    const route = useRoute()

    const [isCategories, setIsCategories] = useState<boolean>(false)
    const [isOptionsGame, setIsOptionsGame] = useState<boolean>(false)
    const [isConnection, setIsConnection] = useState<boolean | null>(true)

    const [message, setMessage] = useState<string>("")

    const generateGame = async () => {

        if (!isConnection) {

            const allGames = games.games.map((game: IGame) => game.questions.filter((question: IQuestion) => !question.image))
                .filter(arr => arr.length > 0)

            if (gameWithoutInternet(allGames).length >= 5) {
                navigation.navigate('Playing', {
                    questionsWC: gameWithoutInternet(allGames)
                        .slice(0, gameWithoutInternet(allGames).length < users.user.user.amountQuestions ? gameWithoutInternet(allGames).length : users.user.user.amountQuestions),
                    isConnection
                })
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
    }, [isConnection, route.name])

    return (
        <View style={homeStyles.containerPlay}>
            {/* {
                isConnection &&
                <View>
                    <BannerAd
                        unitId={adUnitId as string}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    />
                </View>
            } */}
            {
                isCategories && <Categories user={users.user} categories={users.user.user.categories} setIsCategories={setIsCategories} isConnection={isConnection} />
            }
            {
                isOptionsGame && <OptionsGame setIsOptionsGame={setIsOptionsGame} isConnection={isConnection} />
            }
            <View style={homeStyles.containerMenuButtons}>
                <Error msg={message} />
                <ButtonMenu text="Iniciar juego" redirect={generateGame} isAccept={false} />
                <ButtonMenu text="Categorías" redirect={showCategories} isAccept={false} />
                <ButtonMenu text="Opciones" redirect={showOptions} isAccept={false} />
                <ButtonMenu text="Regresar" redirect={back} isAccept={false} />
            </View>
        </View>
    )
}

export default Play