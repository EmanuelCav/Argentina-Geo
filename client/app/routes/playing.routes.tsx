import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, Image, Dimensions, ImageSourcePropType, StyleSheet } from 'react-native'

import Finish from '../components/game/finish'
import DataGame from '../components/game/dataGame'
import OptionGame from '../components/game/optionGame'

import { IReducer } from '../interface/Reducer'

import { gameStyles } from '../styles/game.styles';

import { selector } from '../helper/selector'

const Playing = () => {

    const users = useSelector((state: IReducer) => selector(state).users)
    const games = useSelector((state: IReducer) => selector(state).games)

    const usersOptions = (): number => {
        if(users.user.user.amountOptions === 2) {
            return 13.73
        }

        if(users.user.user.amountOptions === 4) {
            return 16.22
        }

        if(users.user.user.amountOptions === 6) {
            return 18.71
        }

        if(users.user.user.amountOptions === 8) {
            return 22.31
        }

        return 22.31
    }

    const styles = StyleSheet.create({
        textButtonOptions: {
            color: "#ffffff",
            fontSize: ((Dimensions.get("window").height - ((Dimensions.get("window").height / 60) * 2)) / 2)/usersOptions(),
            textAlign: 'center'
        }
    })

    const [seconds, setSeconds] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)

    const [numberQuestion, setNumberQuestion] = useState<number>(0)
    const [isFinish, setIsFinish] = useState<boolean>(false)

    const nextQuestion = () => {
        if (numberQuestion === games.game.questions.length - 1) {
            setIsFinish(true)
            return
        }

        setNumberQuestion(numberQuestion + 1)
    }

    useEffect(() => {
    }, [numberQuestion, isFinish])

    useEffect(() => {
        if(seconds === 60) {
            setSeconds(0)
            setMinutes(1)
        }

        setTimeout(() => {
            setSeconds(seconds+1)
        }, 1000);
    }, [seconds])

    return (
        <View style={gameStyles.gameContainer}>
            {
                isFinish && <Finish />
            }
            <View style={gameStyles.containerQuestion}>
                {
                    games.game.questions[numberQuestion].question.image ? (
                        <Image source={games.game.questions[numberQuestion].question.image.image as ImageSourcePropType}
                            style={gameStyles.imageQuestion} resizeMode={'contain'} />
                    ) : (
                        <View>
                            <Text>{games.game.questions[numberQuestion].question.text}</Text>
                            <Text>{games.game.questions[numberQuestion].question.text}</Text>
                        </View>
                    )
                }
            </View>
            <DataGame numberQuestion={numberQuestion} amountQuestions={users.user.user.amountQuestions} seconds={seconds} minutes={minutes} />
            <View style={gameStyles.containerOptions}>
                <View style={gameStyles.containerSectionOptions}>
                    {
                        games.game.questions[numberQuestion].options.map((item, index) => {
                            return <OptionGame styles={styles} text={item} key={index} redirect={nextQuestion} />
                        }).slice(0, games.game.questions[numberQuestion].options.length / 2)
                    }
                </View>
                <View style={gameStyles.containerSectionOptions}>
                    {
                        games.game.questions[numberQuestion].options.map((item, index) => {
                            return <OptionGame styles={styles} text={item} key={index} redirect={nextQuestion} />
                        }).slice(games.game.questions[numberQuestion].options.length / 2, games.game.questions[numberQuestion].options.length)
                    }
                </View>
            </View>
        </View>
    )
}

export default Playing