import { View } from 'react-native';

import Time from './components/dataGame/Time';
import QuestionPosition from './components/dataGame/QuestionPosition';
import Helps from './components/dataGame/Helps';

import { gameStyles } from '../../styles/game.styles';

import { GameDataPropsType } from '../../types/playing.types';

const DataGame = ({ numberQuestion, amountQuestions, seconds, minutes, changeHelp, helps, isHelped, isGameError }: GameDataPropsType) => {
  return (
    <>
      {
        isGameError ? (
          <View style={gameStyles.containerDataGame}>
            <Helps changeHelp={changeHelp} helps={helps} isHelped={isHelped} />
          </View>
        ) : (
          <View style={gameStyles.containerDataGame}>
            <QuestionPosition numberQuestion={numberQuestion + 1} amountQuestions={amountQuestions} />
            <Helps changeHelp={changeHelp} helps={helps} isHelped={isHelped} />
            <Time seconds={seconds} minutes={minutes} />
          </View>
        )
      }
    </>
  )
}

export default DataGame