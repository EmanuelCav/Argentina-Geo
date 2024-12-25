import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, BackHandler } from 'react-native'
import { InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { INTERSTITIAL_FINISH_ID, RECOMPENSADO_ID } from '@env';

import Finish from '../components/game/Finish'
import DataGame from '../components/game/DataGame'
import ShowOptionsGame from '../components/game/ShowOptionsGame'
import ShowQuestion from '../components/game/ShowQuestion'
import Answer from '../components/game/Answer';
import PreFinish from '../components/game/PreFinish';

import { IReducer } from '../interface/Reducer'
import { IPoints } from '../interface/User'
import { IQuestion } from '../interface/Game'
import { PlayingType } from '../types/playing.types'
import { HelpType } from '../types/props.types';

import { questionsCorrectApi, questionsCountApi } from '../server/api/game.api'
import { loadingAction } from '../server/features/response.features'
import { experienceGame } from '../server/actions/game.actions';
import { helpsApi } from '../server/api/user.api';
import { updateOptionsAction } from '../server/features/user.features';

import { generalStyles } from '../styles/general.styles';

import { selector } from '../helper/selector'
import { categoryStatistic } from '../helper/statistic'
import { generateOptions, helpsOptions } from '../helper/generator'

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${INTERSTITIAL_FINISH_ID}`;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

const adUnitIdReward = __DEV__ ? TestIds.REWARDED : `${RECOMPENSADO_ID}`;

const rewarded = RewardedAd.createForAdRequest(adUnitIdReward, {
    keywords: ['fashion', 'clothing'],
});

const Playing = ({ navigation, route }: PlayingType) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

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
    const [isHelped, setIsHelped] = useState<boolean>(false)
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [isIntersitialLoaded, setIsIntersitialLoaded] = useState<boolean>(false)
    const [isRecompensadoLoaded, setIsRecompensadoLoaded] = useState<boolean>(false)

    const [helpType, setHelpType] = useState<HelpType>('help')

    const [options, setOptions] = useState<string[]>(generateOptions(route.params.questionsWC[numberQuestion].options, route.params.isConnection ? users.user.user?.amountOptions! : 4))
    const [optionsHelped, setOptionsHelped] = useState<string[]>(helpsOptions(options, route.params.questionsWC[numberQuestion], route.params.isConnection ? users.user.user?.amountOptions! : 4))

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

        setOptionsHelped([])
        setIsHelped(false)

        setTimeout(() => {
            dispatch(loadingAction(false))
        }, 800);
    }

    const nextQuestion = async (item: string) => {

        if (item === (isGameError ? errorsGame[numberQuestion].answer : route.params.questionsWC[numberQuestion].answer)) {
            setNumberCorrect(numberCorrect + 1)
            setIsCorrect(true)
        }

        if (item !== (isGameError ? errorsGame[numberQuestion].answer : route.params.questionsWC[numberQuestion].answer)) {
            if (isGameError) {
                setErrors([...errors, errorsGame[numberQuestion]])
            } else {
                setErrors([...errors, route.params.questionsWC[numberQuestion]])
            }

            setIsIncorrect(true)
        }

        if (!isGameError) {
            if (numberQuestion < (route.params.questionsWC.length - 1)) {
                setOptions(generateOptions(route.params.questionsWC[numberQuestion + 1].options, route.params.isConnection ? users.user.user?.amountOptions! : 4))
            }
            setRealSeconds(seconds)
            setRealMinutes(minutes)
        } else {
            if (numberQuestion < errorsGame.length - 1) {
                setOptions(generateOptions(errorsGame[numberQuestion + 1].options, route.params.isConnection ? users.user.user?.amountOptions! : 4))
            }
        }

        if (numberQuestion === (isGameError ? (errorsGame.length - 1) : (route.params.questionsWC.length - 1))) {
            setIsPreFinish(true)
            if (errors.length > 0) {
                setOptions(generateOptions(errors[0].options, route.params.isConnection ? users.user.user?.amountOptions! : 4))
            }
        }
    }

    const experienceUser = async () => {

        if (points !== 0) {
            dispatch(experienceGame({
                pointsData,
                user: users.user
            }) as any)

            setIsFinish(true)

        }

    }

    const redirectFinish = async () => {

        if (!isGameError && route.params.isConnection) {
            setPointsData({
                points: Math.ceil((users.user.user?.amountOptions! * users.user.user?.amountQuestions! *
                    users.user.user?.categories?.filter(category => category.isSelect).length! * numberCorrect) / (totalSeconds))
            })
        }

        setIsPreFinish(false)

        if (isGameError || !route.params.isConnection) {
            setIsFinish(true)
        }

    }

    const continueGame = () => {
        setIsCorrect(false)
        setIsIncorrect(false)
        setIsHelped(false)
        setRealSeconds(0)
        setRealMinutes(0)

        if (route.params.isConnection) {
            if (numberQuestion !== (isGameError ? (errorsGame.length - 1) : (route.params.questionsWC.length - 1))) {
                setNumberQuestion(numberQuestion + 1)
            }
        } else {
            if (numberQuestion !== (isGameError ? (errorsGame.length - 1) : (route.params.questionsWC.length - 1))) {
                setNumberQuestion(numberQuestion + 1)
            }
        }
    }

    const statisticsCount = async () => {
        await questionsCountApi(categoryStatistic(users.user.user?.categories!, route.params.questionsWC[numberQuestion].category.name), users.user.token!)
    }

    const statisticsCorrect = async () => {
        await questionsCorrectApi(categoryStatistic(users.user.user?.categories!, route.params.questionsWC[numberQuestion].category.name), users.user.token!)
    }

    const changeHelp = async (type: HelpType) => {

        try {

            setIsHelped(true)
            setHelpType(type)

            if (type === 'add') {
                if (route.params.isConnection) {
                    if (rewarded.loaded || isRecompensadoLoaded) {
                        rewarded.show()
                        setIsAdd(true)
                    } else {
                        navigation.navigate('Home')
                    }
                }
            }

        } catch (error) {
            console.error("Error showing rewarded ad:", error);
            navigation.navigate('Home')
        }
    }

    const handleHelp = async (type: HelpType) => {

        try {

            const { data } = await helpsApi(type, users.user.token!)
            dispatch(updateOptionsAction(data))

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isGameError) {
            if (route.params.isConnection) {
                statisticsCount()
            }

            setOptionsHelped(helpsOptions(options, route.params.questionsWC[numberQuestion], route.params.isConnection ? users.user.user?.amountOptions! : 4))

            return
        }

        setOptionsHelped(helpsOptions(options, errorsGame[numberQuestion], route.params.isConnection ? users.user.user?.amountOptions! : 4))

    }, [numberQuestion])

    useEffect(() => {
        if (isCorrect && !isGameError && route.params.isConnection) {
            statisticsCorrect()
        }
    }, [numberCorrect])

    useEffect(() => {
        if (isHelped && route.params.isConnection) {
            handleHelp(helpType)
        }
    }, [isHelped])

    useEffect(() => {
        if (!isGameError) {

            if (seconds === 60) {
                setSeconds(0)
                setMinutes(minutes + 1)
                return
            }

            if (minutes === 60) return

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
        if (!isGameError && route.params.isConnection) {
            experienceUser()
        }
    }, [points])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    useEffect(() => {

        const loadInterstitialAd = () => {
            try {
                interstitial.load();
            } catch (error) {
                console.error("Error loading interstitial ad:", error);
            }
        };

        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setIsIntersitialLoaded(true)
        });

        const unsubscribedClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            setIsIntersitialLoaded(false)
            loadInterstitialAd();
        });

        loadInterstitialAd();

        return () => {
            unsubscribeLoaded()
            unsubscribedClosed()
        };
    }, []);

    useEffect(() => {

        const loadRewardedAd = () => {
            try {
                rewarded.load();
            } catch (error) {
                console.error("Error loading rewarded ad:", error);
            }
        };

        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setIsRecompensadoLoaded(true)
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            () => {
                setIsRecompensadoLoaded(false)
            },
        );

        loadRewardedAd();

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);

    return (
        <View style={generalStyles.containerGeneral}>
            {
                isFinish && <Finish minutes={realMinutes} seconds={realSeconds} corrects={numberCorrect} points={points}
                    navigation={navigation} viewErrors={viewErrors} isConnection={route.params.isConnection} interstitial={interstitial}
                    isGameError={isGameError} areErrors={errors.length !== 0} changeHelp={changeHelp} isAdd={isAdd}
                    isRecompensadoLoaded={isRecompensadoLoaded || rewarded.loaded} setIsRecompensadoLoaded={setIsRecompensadoLoaded}
                    isIntersitialLoaded={(isIntersitialLoaded || interstitial.loaded) && users.user.user?.isAdd!} />
            }
            {
                isPreFinish && <PreFinish redirectFinish={redirectFinish} />
            }
            <ShowQuestion questions={isGameError ? errorsGame : route.params.questionsWC} numberQuestion={numberQuestion} />
            {
                route.params.isConnection &&
                <DataGame numberQuestion={numberQuestion} amountQuestions={users.user.user?.amountQuestions!}
                    seconds={(realSeconds > 0) ? realSeconds : (seconds === 60) ? 0 : seconds} minutes={(realMinutes > 0) ? realMinutes : minutes}
                    helps={users.user.user?.helps!} isHelped={isCorrect || isIncorrect || isHelped || users.user.user?.helps === 0}
                    changeHelp={changeHelp} isGameError={isGameError} />
            }
            {
                (isCorrect || isIncorrect) ? (
                    <Answer answer={isGameError ? errorsGame[numberQuestion].answer : route.params.questionsWC[numberQuestion].answer}
                        isCorrect={isCorrect} continueGame={continueGame} />
                ) : (
                    <ShowOptionsGame options={options} nextQuestion={nextQuestion} amountOptions={route.params.isConnection ? users.user.user?.amountOptions! : 4}
                        isHelped={isHelped} optionsHelped={optionsHelped} />
                )
            }
        </View>
    )
}

export default Playing