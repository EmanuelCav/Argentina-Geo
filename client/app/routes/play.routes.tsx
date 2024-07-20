import { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { fetch } from "@react-native-community/netinfo";
import { useRoute } from '@react-navigation/native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { BANNER_PLAY_ID } from "@env";
import questionsJson from '../../assets/questions.json'

import ButtonMenu from "../components/ButtonMenu";
import Categories from "../components/categories/Categories";
import OptionsGame from "../components/options/Options";
import Error from '../components/response/Error';

import { game } from "../server/actions/game.actions";
import { getDateExperienceApi } from "../server/api/user.api";

import { StackNavigation } from "../types/props.types";
import { IReducer } from "../interface/Reducer";

import { homeStyles } from "../styles/home.styles";

import { selector } from "../helper/selector";
import { isNewDate } from "../helper/time";
import { shuffle } from "../helper/generator";

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : `${BANNER_PLAY_ID}`;

const Play = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()
    const route = useRoute()

    const [isCategories, setIsCategories] = useState<boolean>(false)
    const [isOptionsGame, setIsOptionsGame] = useState<boolean>(false)
    const [isConnection, setIsConnection] = useState<boolean | null>(true)

    const [message, setMessage] = useState<string>("")

    const generateGame = async () => {

        if (!isConnection) {

            navigation.navigate('Playing', {
                questionsWC: shuffle(questionsJson.filter((q) => q.image === undefined) as any[]),
                isConnection
            })

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

    const getNewDate = async () => {
        try {
            await getDateExperienceApi(users.user.token)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetch().then(conn => conn).then(state => setIsConnection(state.isConnected));
    }, [isConnection, route.name])

    useEffect(() => {
        if (isConnection && users.isLoggedIn) {
            if (isNewDate(new Date(new Date().setHours(new Date().getHours() - 3)).toISOString().split("T")[0], users)) {
                getNewDate()
            }
        }
    }, [isConnection])

    return (
        <View style={homeStyles.containerPlay}>
            {
                isConnection && users.user.user.isAdd &&
                <View>
                    <BannerAd
                        unitId={adUnitId as string}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    />
                </View>
            }
            {
                isCategories && <Categories user={users.user} categories={users.user.user.categories} setIsCategories={setIsCategories} />
            }
            {
                isOptionsGame && <OptionsGame setIsOptionsGame={setIsOptionsGame} />
            }
            <View style={homeStyles.containerMenuButtons}>
                <Error msg={message} />
                <ButtonMenu text="Iniciar juego" redirect={generateGame} isAccept={false} disabled={false} />
                <ButtonMenu text="Categorías" redirect={showCategories} isAccept={false} disabled={!isConnection} />
                <ButtonMenu text="Opciones" redirect={showOptions} isAccept={false} disabled={!isConnection} />
                <ButtonMenu text="Regresar" redirect={back} isAccept={false} disabled={false} />
            </View>
        </View>
    )
}

export default Play