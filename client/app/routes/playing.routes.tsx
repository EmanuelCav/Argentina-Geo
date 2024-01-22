import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, Dimensions, StyleSheet, Pressable, BackHandler } from 'react-native'
// import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
// import { INTERSTITIAL_FINISH_ID } from '@env';

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

import { gameStyles } from '../styles/game.styles';

import { selector } from '../helper/selector'
import { experienceGame } from '../server/actions/game.actions';

// const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${INTERSTITIAL_FINISH_ID}`;

// const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//     keywords: ['fashion', 'clothing'],
// });

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
    const [numberCorrect, setNumberCorrect] = useState<number>(0)

    const [numberQuestion, setNumberQuestion] = useState<number>(0)

    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [isIncorrect, setIsIncorrect] = useState<boolean>(false)
    const [isPreFinish, setIsPreFinish] = useState<boolean>(false)
    const [isFinish, setIsFinish] = useState<boolean>(false)
    const [isGameError, setIsGameError] = useState<boolean>(false)

    const { points } = pointsData

    const viewErrors = () => {

        dispatch(loadingAction(true))
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
        if (item === (isGameError ? (errorsGame[numberQuestion].question.answer) : (route.params.questionsWC[numberQuestion].question.answer))) {
            setIsCorrect(true)
        }

        if (item !== (isGameError ? (errorsGame[numberQuestion].question.answer) : (route.params.questionsWC[numberQuestion].question.answer))) {
            if (isGameError) {
                setErrors([...errors, errorsGame[numberQuestion]])
            } else {
                setErrors([...errors, route.params.questionsWC[numberQuestion]])
            }

            setIsIncorrect(true)
        }

        if (numberQuestion === (isGameError ? (errorsGame.length - 1) : (route.params.questionsWC.length - 1))) {
            setIsPreFinish(true)

            if (!isGameError) {
                setRealSeconds(seconds)
                setRealMinutes(minutes)
            }

            return

        }

        setNumberQuestion(numberQuestion + 1)
    }

    const nextQuestion = async (item: string) => {

        if (item === (isGameError ? (errorsGame[numberQuestion].question.answer) : (games.game.questions[numberQuestion].question.answer))) {
            if (!isGameError) {
                setNumberCorrect(numberCorrect + 1)
            }
            setIsCorrect(true)
        }

        if (item !== (isGameError ? (errorsGame[numberQuestion].question.answer) : (games.game.questions[numberQuestion].question.answer))) {
            if (isGameError) {
                setErrors([...errors, errorsGame[numberQuestion]])
            } else {
                setErrors([...errors, games.game.questions[numberQuestion]])
            }

            setIsIncorrect(true)
        }

        if (numberQuestion === (isGameError ? (errorsGame.length - 1) : (games.game.questions.length - 1))) {

            setIsPreFinish(true)

            if (!isGameError) {
                setRealSeconds(seconds)
                setRealMinutes(minutes)
            }

            return
        }

        setNumberQuestion(numberQuestion + 1)
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
                    users.user.user.categories.filter(category => category.isUnlocked && category.isSelect).length * numberCorrect) / (seconds + (60 * minutes)))
            })
        }

        setIsPreFinish(false)

        if (isGameError) {
            setIsFinish(true)
        }

    }

    useEffect(() => {

        setTimeout(() => {
            setIsCorrect(false)
            setIsIncorrect(false)
        }, 225);

    }, [isCorrect, isIncorrect])

    useEffect(() => {
        if (!isGameError) {
            if (seconds === 60) {
                setSeconds(0)
                setMinutes(minutes + 1)
            }

            if (minutes === 60) {
                return
            }

            setTimeout(() => {
                if (!isFinish && !isPreFinish) {
                    setSeconds(seconds + 1)
                }
            }, 1000);
        }
    }, [seconds])

    useEffect(() => {
        if (!isGameError) {
            experienceUser()
        }
    }, [points])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    // useEffect(() => {
    //     const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
    //         console.log("Loading add");
    //     });

    //     interstitial.load();

    //     return unsubscribe;
    // }, []);

    const statisticsCount = async () => {
        await questionsCountApi(games.game.questions[numberQuestion].categoryUser, users.user.token)
    }
    const statisticsCorrect = async () => {
        const { data } = await questionsCorrectApi(isPreFinish ? games.game.questions[games.game.questions.length - 1].categoryUser : games.game.questions[numberQuestion - 1].categoryUser,
            games.game._id, users.user.token)
        dispatch(getGameAction(data))
    }
    const generateQuestion = async (questionSelected: number) => {
        const { data } = await generateQuestionApi(games.game._id, route.params.questionsWC[questionSelected]._id, users.user.token)
        dispatch(getGameAction(data))
    }

    useEffect(() => {
        if (!isGameError && route.params.isConnection) {
            statisticsCount()
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
                if (questionSelected >= route.params.questionsWC.length) {
                    questionSelected = Math.floor(Math.random() * route.params.questionsWC.length)
                }
                generateQuestion(questionSelected)
            }
        }
    }, [numberQuestion])

    return (
        <View style={gameStyles.gameContainer}>
            {
                isFinish ? (
                    <Finish minutes={realMinutes} seconds={realSeconds} corrects={numberCorrect} points={points}
                        navigation={navigation} viewErrors={viewErrors} isConnection={route.params.isConnection}
                        isGameError={isGameError} areErrors={errors.length === 0 ? false : true} />
                ) : (
                    <>
                        {
                            isCorrect && <View style={gameStyles.containerCorrect} />
                        }
                        {
                            isIncorrect && <View style={gameStyles.containerIncorrect} />
                        }
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
                                    <ShowOptionsGame questions={errorsGame} numberQuestion={numberQuestion} styles={styles}
                                        nextQuestion={route.params.isConnection ? nextQuestion : nextQuestionWihoutInternet} />
                                </>
                            ) : (
                                <>
                                    <ShowQuestion questions={route.params.isConnection ? games.game.questions : route.params.questionsWC} numberQuestion={numberQuestion} />
                                    <DataGame numberQuestion={numberQuestion} amountQuestions={users.user.user.amountQuestions} seconds={seconds} minutes={minutes} />
                                    <ShowOptionsGame questions={route.params.isConnection ? games.game.questions : route.params.questionsWC} numberQuestion={numberQuestion} styles={styles}
                                        nextQuestion={route.params.isConnection ? nextQuestion : nextQuestionWihoutInternet} />
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