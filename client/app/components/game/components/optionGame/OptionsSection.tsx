import { View } from 'react-native'

import OptionGame from '../../OptionGame'

import { gameStyles } from '../../../../styles/game.styles'

import { ShowOptionGamePropsType } from '../../../../types/playing.types'

const OptionsSection = ({ options, nextQuestion, amountOptions, isHelped, optionsHelped }: ShowOptionGamePropsType) => {
    return (
        <View style={gameStyles.containerSectionOptions}>
            {
                options.map((item: string, index: number) => {
                    return <OptionGame text={item} disabled={isHelped ? optionsHelped.includes(item) : false}
                        nextQuestion={nextQuestion} amountOptions={amountOptions} key={index} />
                })
            }
        </View>
    )
}

export default OptionsSection