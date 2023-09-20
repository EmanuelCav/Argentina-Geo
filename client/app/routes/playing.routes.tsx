import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, Image, FlatList } from 'react-native'
import type { ImageSourcePropType } from 'react-native';

import Finish from '../components/game/finish'
import OptionGame from '../components/game/optionGame'

import { IReducer } from '../interface/Reducer'

import { gameStyles } from '../styles/game.styles';

import { selector } from '../helper/selector'

const Playing = () => {

    const games = useSelector((state: IReducer) => selector(state).games)

    const [numberQuestion, setNumberQuestion] = useState<number>(0)
    const [isFinish, setIsFinish] = useState<boolean>(false)

    const nextQuestion = () => {
        if(numberQuestion === games.game.questions.length - 1) {
            setIsFinish(true)
            return
        }

        setNumberQuestion(numberQuestion+1)
    }

    useEffect(() => {
    }, [numberQuestion, isFinish])

    return (
        <View style={gameStyles.gameContainer}>
            {
                isFinish && <Finish />
            }
            <View style={gameStyles.containerQuestion}>
                {
                    games.game.questions[numberQuestion].question.image ? (
                        <Image source={games.game.questions[numberQuestion].question.image.image as ImageSourcePropType} 
                        style={gameStyles.imageQuestion} resizeMode={'contain'}/>
                    ) : (
                        <View>
                            <Text style={{ fontSize: 25 }}>{games.game.questions[numberQuestion].question.text}</Text>
                            <Text style={{ fontSize: 25 }}>{games.game.questions[numberQuestion].question.text}</Text>
                        </View>
                    )
                }
            </View>
            <View style={gameStyles.containerOptions}>
                <FlatList 
                    data={games.game.questions[numberQuestion].options}
                    renderItem={({item}) => (
                        <OptionGame text={item} redirect={nextQuestion} />
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => String(index)}
                />
            </View>
        </View>
    )
}

export default Playing