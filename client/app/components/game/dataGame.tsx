import { View, Text } from 'react-native';

import Time from './components/time';

import { gameStyles } from '../../styles/game.styles';

import { GameDataProps } from '../../types/props.types';

const DataGame = ({ numberQuestion, amountQuestions, seconds, minutes }: GameDataProps) => {
  return (
    <View style={gameStyles.containerDataGame}>
      <Text style={gameStyles.textDataGame}>{numberQuestion + 1}/{amountQuestions}</Text>
      <Time seconds={seconds} minutes={minutes} specialText='' />
    </View>
  )
}

export default DataGame