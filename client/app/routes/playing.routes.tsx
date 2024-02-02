import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, Dimensions, StyleSheet, Pressable, BackHandler } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { INTERSTITIAL_FINISH_ID } from '@env';

import Finish from '../components/game/finish'
import DataGame from '../components/game/dataGame'
import ShowOptionsGame from '../components/game/showOptionsGame'
import ShowQuestion from '../components/game/showQuestion'

import { IReducer } from '../interface/Reducer'
import { IPoints } from '../interface/User'
import { IQuestion } from '../interface/Game'
import { PlayingType } from '../types/games.types'

import { generateQuestionApi, questionsCorrectApi, questionsCountApi } from '../server/api/game.api'
import { getGameAction } from '../server/features/game.features'
import { loadingAction } from '../server/features/response.features'
import { experienceGame } from '../server/actions/game.actions';

import { gameStyles } from '../styles/game.styles';

import { selector } from '../helper/selector'
import { categoryStatistic } from '../helper/statistic'
import { generateOptions } from '../helper/generator'

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${INTERSTITIAL_FINISH_ID}`;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

const Playing = ({ navigation, route }: PlayingType) => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const dispatch = useDispatch()

    const usersOptions = (): number => {
        if (users.user.user.amountOptions === 2) {
            return 19.54
        }

        if (users.user.user.amountOptions === 4) {
            return 22.12
        }

        if (users.user.user.amountOptions === 6) {
            return 25.86
        }

        if (users.user.user.amountOptions === 8) {
            return 29.31
        }

        return 22.31
    }

    const styles = StyleSheet.create({
        textButtonOptions: {
            color: "#ffffff",
            fontSize: ((Dimensions.get("window").height - ((Dimensions.get("window").height / 60) * 2)) / 2) / usersOptions(),
            textAlign: 'center'
        }
    })

    const initialState: IPoints = {
        points: 0
    }

    const [pointsData, setPointsData] = useState<IPoints>(initialState)

    const [errors, setErrors] = useState<IQuestion[]>([])
    const [errorsGame, setErrorsGame] = useState<IQuestion[]>([])

    const [seconds, setSeconds] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [realSeconds, setRealSeconds] = useState<number>(0)
    const [realMinutes, setRealMinutes] = useState<number>(0)
    const [totalSeconds, setTotalSeconds] = useState<number>(0)
    const [numberCorrect, setNumberCorrect] = useState<number>(0)

    const [numberQuestion, setNumberQuestion] = useState<number>(0)

    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [isIncorrect, setIsIncorrect] = useState<boolean>(false)
    const [isPreFinish, setIsPreFinish] = useState<boolean>(false)
    const [isFinish, setIsFinish] = useState<boolean>(false)
    const [isGameError, setIsGameError] = useState<boolean>(false)

    const [options, setOptions] = useState<string[]>(generateOptions(games.game.questions[numberQuestion].options, users.user.user.amountOptions))

    const { points } = pointsData

    const viewErrors = () => {

        dispatch(loadingAction(true))
        setIsIncorrect(false)
        setIsCorrect(false)
        setIsGameError(true)
        setIsFinish(false)
        setNumberQuestion(0)

        setErrorsGame(errors)
        setErrors([])

        setTimeout(() => {
            dispatch(loadingAction(false))
        }, 800);
    }

    const nextQuestionWihoutInternet = (item: string) => {
        if (item === (isGameError ? (errorsGame[numberQuestion].answer) : (route.params.questionsWC[numberQuestion].answer))) {
            setIsCorrect(true)
        }

        if (item !== (isGameError ? (errorsGame[numberQuestion].answer) : (route.params.questionsWC[numberQuestion].answer))) {
            if (isGameError) {
                setErrors([...errors, errorsGame[numberQuestion]])
            } else {
                setErrors([...errors, route.params.questionsWC[numberQuestion]])
            }

            setIsIncorrect(true)
        }

        if (!isGameError) {
            if (numberQuestion < route.params.questionsWC.length - 1) {
                setOptions(generateOptions(route.params.questionsWC[numberQuestion + 1].options, users.user.user.amountOptions))
            }
            setRealSeconds(seconds)
            setRealMinutes(minutes)
        } else {
            if (numberQuestion < errorsGame.length - 1) {
                setOptions(generateOptions(errorsGame[numberQuestion + 1].options, users.user.user.amountOptions))
            }
        }

        if (numberQuestion === (isGameError ? (errorsGame.length - 1) : (route.params.questionsWC.length - 1))) {
            if (errors.length > 0) {
                setOptions(generateOptions(errors[0].options, users.user.user.amountOptions))
            }
            setIsPreFinish(true)
        }
    }

    const nextQuestion = async (item: string) => {

        if (item === (isGameError ? (errorsGame[numberQuestion].answer) : (games.game.questions[numberQuestion].answer))) {
            if (!isGameError) {
                setNumberCorrect(numberCorrect + 1)
            }
            setIsCorrect(true)
        }

        if (item !== (isGameError ? (errorsGame[numberQuestion].answer) : (games.game.questions[numberQuestion].answer))) {
            if (isGameError) {
                setErrors([...errors, errorsGame[numberQuestion]])
            } else {
                setErrors([...errors, games.game.questions[numberQuestion]])
            }

            setIsIncorrect(true)
        }

        if (!isGameError) {
            if (numberQuestion < games.game.questions.length - 1) {
                setOptions(generateOptions(games.game.questions[numberQuestion + 1].options, users.user.user.amountOptions))
            }
            setRealSeconds(seconds)
            setRealMinutes(minutes)
        } else {
            if (numberQuestion < errorsGame.length - 1) {
                setOptions(generateOptions(errorsGame[numberQuestion + 1].options, users.user.user.amountOptions))
            }
        }

        if (numberQuestion === (isGameError ? (errorsGame.length - 1) : (games.game.questions.length - 1))) {
            setIsPreFinish(true)
            if (errors.length > 0) {
                setOptions(generateOptions(errors[0].options, users.user.user.amountOptions))
            }
        }
    }

    const experienceUser = async () => {

        if (points !== 0) {
            if (route.params.isConnection) {
                dispatch(experienceGame({
                    pointsData,
                    user: users.user
                }) as any)

            }

            setIsFinish(true)

        }

    }

    const redirectFinish = async () => {

        if (!isGameError) {
            setPointsData({
                points: Math.ceil((users.user.user.amountOptions * users.user.user.amountQuestions *
                    users.user.user.categories.filter(category => category.isSelect).length * numberCorrect) / (totalSeconds + (60 * minutes)))
            })
        }

        setIsPreFinish(false)

        if (isGameError) {
            setIsFinish(true)
        }

    }

    const setCorrect = () => {
        setIsCorrect(false)
        setRealSeconds(0)
        setRealMinutes(0)
        if (numberQuestion !== (isGameError ? (errorsGame.length - 1) : (games.game.questions.length - 1))) {
            setNumberQuestion(numberQuestion + 1)
        }
    }
    const setIncorrect = () => {
        setIsIncorrect(false)
        setRealSeconds(0)
        setRealMinutes(0)
        if (numberQuestion !== (isGameError ? (errorsGame.length - 1) : (games.game.questions.length - 1))) {
            setNumberQuestion(numberQuestion + 1)
        }
    }

    useEffect(() => {
        if (!isGameError) {

            if (seconds === 60) {
                setSeconds(0)
                setMinutes(minutes + 1)
                return
            }

            if (minutes === 60) {
                return
            }

            setTimeout(() => {
                if (!isFinish && !isPreFinish) {
                    if (!isCorrect && !isIncorrect) {
                        setTotalSeconds(totalSeconds + 1)
                        setSeconds(seconds + 1)
                    }
                }
            }, 1000);
        }
    }, [seconds, realSeconds])

    useEffect(() => {
        if (!isGameError) {
            experienceUser()
        }
    }, [points])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            console.log("Loading add");
        });

        interstitial.load();

        return unsubscribe;
    }, []);

    const statisticsCount = async () => {
        await questionsCountApi(categoryStatistic(users.user.user.categories, games.game.questions[numberQuestion].category.name), users.user.token)
    }
    const statisticsCorrect = async () => {
        const { data } = await questionsCorrectApi(isPreFinish ?
            (categoryStatistic(users.user.user.categories, games.game.questions[games.game.questions.length - 1].category.name)) :
            (categoryStatistic(users.user.user.categories, games.game.questions[numberQuestion].category.name)),
            games.game._id, users.user.token)
        dispatch(getGameAction(data))
    }
    const generateQuestion = async (questionSelected: number) => {
        const { data } = await generateQuestionApi(games.game._id, route.params.questionsWC[questionSelected]._id, users.user.token)
        dispatch(getGameAction(data))
    }

    useEffect(() => {
        if (!isGameError) {
            if (route.params.isConnection) {
                statisticsCount()
            }
        }
    }, [numberQuestion])

    useEffect(() => {
        if (isCorrect) {
            statisticsCorrect()
        }
    }, [numberCorrect])

    useEffect(() => {
        if (!isGameError && route.params.isConnection) {
            let questionSelected = numberQuestion + 5;
            if (questionSelected < users.user.user.amountQuestions) {
                generateQuestion(questionSelected)
            }
        }
    }, [numberQuestion])

    return (
        <View style={gameStyles.gameContainer}>
            {
                isFinish ? (
                    <Finish minutes={realMinutes} seconds={realSeconds} corrects={numberCorrect} points={points}
                        navigation={navigation} viewErrors={viewErrors} isConnection={route.params.isConnection} interstitial={interstitial}
                        isGameError={isGameError} areErrors={errors.length === 0 ? false : true} />
                ) : (
                    <>
                        {
                            isPreFinish &&
                            <Pressable style={gameStyles.containerPreFinish} onPress={redirectFinish}>
                                <View style={gameStyles.containPreFinish}>
                                    <Text style={gameStyles.textHeaderGame}>¡Juego Finalizado!</Text>
                                    <Text style={gameStyles.textFinishGame}>Pulsa para continuar</Text>
                                </View>
                            </Pressable>
                        }
                        {
                            isGameError ? (
                                <>
                                    <ShowQuestion questions={errorsGame} numberQuestion={numberQuestion} />
                                    {
                                        isCorrect ? (
                                            <Pressable style={{
                                                width: '100%', flex: 1, backgroundColor: 'rgb(89, 205, 238)', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column',
                                                borderColor: '#0f0', borderWidth: 2, borderStyle: 'solid', paddingHorizontal: Dimensions.get("window").width / 60
                                            }}
                                                onPress={setCorrect}>
                                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Icon name='checkmark-circle' color={'#0f0'} size={Dimensions.get("window").height / 33} />
                                                    <Text style={{ color: '#0f0', fontSize: Dimensions.get("window").height / 33 }}>Correcto</Text>
                                                </View>
                                                <Text style={{ color: '#0f0', fontSize: Dimensions.get("window").height / 37 }}>Toca para continuar</Text>
                                            </Pressable>
                                        ) : isIncorrect ? (
                                            <Pressable style={{
                                                width: '100%', flex: 1, backgroundColor: 'rgb(89, 205, 238)', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column',
                                                borderColor: '#f00', borderWidth: 2, borderStyle: 'solid', paddingHorizontal: Dimensions.get("window").width / 60
                                            }} onPress={setIncorrect}>
                                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Icon name='close-circle' color={'#f00'} size={Dimensions.get("window").height / 33} />
                                                    <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 33 }}>Incorrecto</Text>
                                                </View>
                                                <View style={{ width: '100%' }}>
                                                    {
                                                        route.params.isConnection &&
                                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 37 }}>Respuesta correcta</Text>
                                                            <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 37 }}>
                                                                {errorsGame[numberQuestion].answer}
                                                            </Text>
                                                        </View>
                                                    }
                                                </View>
                                                <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 37 }}>Toca para continuar</Text>
                                            </Pressable>
                                        ) : (
                                            <ShowOptionsGame options={options} styles={styles}
                                                nextQuestion={route.params.isConnection ? nextQuestion : nextQuestionWihoutInternet} />
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    <ShowQuestion questions={route.params.isConnection ? games.game.questions : route.params.questionsWC} numberQuestion={numberQuestion} />
                                    <DataGame numberQuestion={numberQuestion} amountQuestions={users.user.user.amountQuestions} seconds={(realSeconds > 0) ? realSeconds : (seconds === 60) ? 0 : seconds} minutes={(realMinutes > 0) ? realMinutes : minutes} />
                                    {
                                        isCorrect ? (
                                            <Pressable style={{
                                                width: '100%', flex: 1, backgroundColor: 'rgb(89, 205, 238)', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column',
                                                borderColor: '#0f0', borderWidth: 2, borderStyle: 'solid', paddingHorizontal: Dimensions.get("window").width / 60
                                            }}
                                                onPress={setCorrect}>
                                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Icon name='checkmark-circle' color={'#0f0'} size={Dimensions.get("window").height / 33} />
                                                    <Text style={{ color: '#0f0', fontSize: Dimensions.get("window").height / 33 }}>Correcto</Text>
                                                </View>
                                                <Text style={{ color: '#0f0', fontSize: Dimensions.get("window").height / 37 }}>Toca para continuar</Text>
                                            </Pressable>
                                        ) : isIncorrect ? (
                                            <Pressable style={{
                                                width: '100%', flex: 1, backgroundColor: 'rgb(89, 205, 238)', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column',
                                                borderColor: '#f00', borderWidth: 2, borderStyle: 'solid', paddingHorizontal: Dimensions.get("window").width / 60
                                            }} onPress={setIncorrect}>
                                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Icon name='close-circle' color={'#f00'} size={Dimensions.get("window").height / 33} />
                                                    <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 33 }}>Incorrecto</Text>
                                                </View>
                                                <View style={{ width: '100%' }}>
                                                    {
                                                        route.params.isConnection &&
                                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 37 }}>Respuesta correcta</Text>
                                                            <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 37 }}>
                                                                {games.game.questions[numberQuestion].answer}
                                                            </Text>
                                                        </View>
                                                    }
                                                </View>
                                                <Text style={{ color: '#f00', fontSize: Dimensions.get("window").height / 37 }}>Toca para continuar</Text>
                                            </Pressable>
                                        ) : (
                                            <ShowOptionsGame options={options} styles={styles}
                                                nextQuestion={route.params.isConnection ? nextQuestion : nextQuestionWihoutInternet} />
                                        )
                                    }
                                </>
                            )
                        }
                    </>
                )
            }
        </View>
    )
}

export default Playing