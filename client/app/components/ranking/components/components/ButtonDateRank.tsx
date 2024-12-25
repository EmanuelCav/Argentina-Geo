import { Pressable, Text } from 'react-native'

import { rankingStyles } from '../../../../styles/ranking.styles'

import { ButtonDateRankPropsType } from '../../../../types/ranking.types'

const ButtonDateRank = ({ isDisabled, func, text }: ButtonDateRankPropsType) => {
  return (
    <Pressable style={({ pressed }) => [{
      backgroundColor: pressed ? "#dddddd" : isDisabled ? "#597EEE" : "#ffffff"
    }, rankingStyles.buttonDateRank]}
      onPress={func} disabled={isDisabled}>
      <Text style={[rankingStyles.infoUserRank, {
        color: isDisabled ? "#ffffff" : "#597EEE"
      }]}>{text}</Text>
    </Pressable>
  )
}

export default ButtonDateRank