import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, Dimensions, StyleSheet, Pressable, BackHandler } from 'react-native'

import Finish from '../components/game/finish'
import DataGame from '../components/game/dataGame'
import ShowOptionsGame from '../components/game/showOptionsGame'
import ShowQuestion from '../components/game/showQuestion'

import { IReducer } from '../interface/Reducer'
import { IPoints } from '../interface/User'
import { IQuestion } from '../interface/Game'
import { StackNavigation } from '../types/props.types'

import { questionsCorrectApi, questionsCountApi } from '../server/api/game.api'
import { getGameAction } from '../server/features/game.features'
import { updateExperienceApi } from '../server/api/user.api'
import { updateOptionsAction } from '../server/features/user.features'
import { loadingAction } from '../server/features/response.features'

import { gameStyles } from '../styles/game.styles';

import { selector } from '../helper/selector'

const Playing = ({ navigation }: { navigation: StackNavigation }) => {

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

    const nextQuestion = async (item: string) => {

        if (!isGameError) {
            await questionsCountApi(games.game.questions[numberQuestion].categoryUser, users.user.token)
        }

        if (item === (isGameError ? (errorsGame[numberQuestion].question.answer) : (games.game.questions[numberQuestion].question.answer))) {
            if (!isGameError) {
                const { data } = await questionsCorrectApi(games.game.questions[numberQuestion].categoryUser, games.game._id, users.user.token)
                dispatch(getGameAction(data))
            }
            setIsCorrect(true)
        }

        if (item !== (isGameError ? (errorsGame[numberQuestion].question.answer) : (games.game.questions[numberQuestion].question.answer))) {
            if(isGameError) {
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

                setPointsData({
                    points: Math.ceil((users.user.user.amountOptions * users.user.user.amountQuestions *
                        users.user.user.categories.filter(category => category.isUnlocked && category.isSelect).length * games.game.corrects) / (seconds + (60 * minutes)))
                })
            }

            return
        }

        setNumberQuestion(numberQuestion + 1)
    }

    const experienceUser = async () => {

        if (points !== 0) {
            try {
                const { data } = await updateExperienceApi(users.user.user.level._id, pointsData, users.user.token)
                dispatch(updateOptionsAction(data))
            } catch (error) {
                console.log(error);
            }
        }

    }

    const redirectFinish = () => {

        dispatch(loadingAction(true))
        setIsPreFinish(false)
        setIsFinish(true)

        setTimeout(() => {
            dispatch(loadingAction(false))
        }, 1000);
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

    return (
        <View style={gameStyles.gameContainer}>
            {
                isFinish ? (
                    <Finish minutes={realMinutes} seconds={realSeconds} corrects={games.game.corrects} points={points}
                        navigation={navigation} viewErrors={viewErrors}
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
                                    <ShowOptionsGame questions={errorsGame} numberQuestion={numberQuestion} styles={styles} nextQuestion={nextQuestion} />
                                </>
                            ) : (
                                <>
                                    <ShowQuestion questions={games.game.questions} numberQuestion={numberQuestion} />
                                    <DataGame numberQuestion={numberQuestion} amountQuestions={users.user.user.amountQuestions} seconds={seconds} minutes={minutes} />
                                    <ShowOptionsGame questions={games.game.questions} numberQuestion={numberQuestion} styles={styles} nextQuestion={nextQuestion} />
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