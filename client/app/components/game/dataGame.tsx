import { View } from 'react-native';

import Time from './components/dataGame/Time';
import QuestionPosition from './components/dataGame/QuestionPosition';
import Helps from './components/dataGame/Helps';

import { gameStyles } from '../../styles/game.styles';

import { GameDataProps } from '../../types/props.types';

const DataGame = ({ numberQuestion, amountQuestions, seconds, minutes }: GameDataProps) => {
  return (
    <View style={gameStyles.containerDataGame}>
      <QuestionPosition numberQuestion={numberQuestion + 1} amountQuestions={amountQuestions} />
      <Helps />
      <Time seconds={seconds} minutes={minutes} />
    </View>
  )
}

export default DataGame