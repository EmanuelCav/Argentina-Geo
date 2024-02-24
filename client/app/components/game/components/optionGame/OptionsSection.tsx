import { View } from 'react-native'

import OptionGame from '../../OptionGame'

import { gameStyles } from '../../../../styles/game.styles'

import { ShowOptionGameProps } from '../../../../types/props.types'

const OptionsSection = ({ options, nextQuestion, amountOptions }: ShowOptionGameProps) => {
    return (
        <View style={gameStyles.containerSectionOptions}>
            {
                options.map((item: string, index: number) => {
                    return <OptionGame text={item} nextQuestion={nextQuestion} amountOptions={amountOptions} key={index} />
                })
            }
        </View>
    )
}

export default OptionsSection