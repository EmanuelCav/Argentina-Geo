import { View } from 'react-native'

import OptionGame from '../../OptionGame'

import { gameStyles } from '../../../../styles/game.styles'

import { ShowOptionGameProps } from '../../../../types/props.types'

const OptionsSection = ({ options, nextQuestion, amountOptions, isHelped, optionsHelped }: ShowOptionGameProps) => {
    return (
        <View style={gameStyles.containerSectionOptions}>
            {
                options.map((item: string, index: number) => {
                    return <OptionGame text={item} disabled={isHelped ? optionsHelped.includes(item) : false} nextQuestion={nextQuestion} amountOptions={amountOptions} key={index} />
                })
            }
        </View>
    )
}

export default OptionsSection