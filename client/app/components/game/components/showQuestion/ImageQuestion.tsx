import { View, Image } from 'react-native'

import { IQuestion } from '../../../../interface/Game'

import { gameStyles } from '../../../../styles/game.styles'

const ImageQuestion = ({ question }: { question: IQuestion }) => {
    return (
        <View style={{ height: '67%', width: '100%' }}>
            <Image source={{ uri: question.image.image }}
                style={gameStyles.imageQuestion} resizeMode={"contain"} />
        </View>
    )
}

export default ImageQuestion