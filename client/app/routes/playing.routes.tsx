import { useState } from 'react'
import { View, Text, Image } from 'react-native'

const Playing = () => {

    const [numberQuestion, setNumberQuestion] = useState<number>(0)

    const [game, setIsGame] = useState([
        {
            question: "Jujuy",
            answer: "Jujuy",
            image: require('../../assets/argentina_bandera.png'),
            text: null,
            options: ["Salta", "Tucumán", "Catamarca", "Jujuy"]
        },
        {
            question: "Capital de",
            answer: "San Salvador de Jujuy",
            image: null,
            text: "Jujuy",
            options: ["Salta", "San Salvador de Jujuy", "San Miguel de Tucumán", "La Rioja"]
        },
        {
            question: "Jujuy",
            answer: "Jujuy",
            image: require('../../assets/argentina_bandera.png'),
            text: null,
            options: ["Salta", "Jujuy", "Tucumán", "Catamarca"]
        }
    ])

    const nextQuestion = () => {
        if(numberQuestion === game.length - 1) {
            return
        }

        setNumberQuestion(numberQuestion+1)
    }

    return (
        <View>
            <View>
                {
                    game[numberQuestion].image ? (
                        <Image source={game[numberQuestion].image} style={{ width: 30, height: 50 }}/>
                    ) : (
                        <>
                            <Text style={{ fontSize: 25 }}>{game[numberQuestion].question}</Text>
                            <Text style={{ fontSize: 25 }}>{game[numberQuestion].text}</Text>
                        </>
                    )
                }
            </View>
            <View>
                {
                    game[numberQuestion].options.map((option: string, index: number) => {
                        return <Text onPress={nextQuestion} style={{ fontSize: 18 }} key={index}>{option}</Text>
                    })
                }
            </View>
        </View>
    )
}

export default Playing