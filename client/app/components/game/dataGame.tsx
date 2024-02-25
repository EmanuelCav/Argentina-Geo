import { View } from 'react-native';

import Time from './components/dataGame/Time';
import QuestionPosition from './components/dataGame/QuestionPosition';
import Helps from './components/dataGame/Helps';

import { gameStyles } from '../../styles/game.styles';

import { GameDataProps } from '../../types/props.types';

const DataGame = ({ numberQuestion, amountQuestions, seconds, minutes, changeHelp, helps, isHelped, isGameError, isConnection }: GameDataProps) => {
  return (
    <>
      {
        isGameError ? (
          <View style={gameStyles.containerDataGame}>
            {
              isConnection &&
              <Helps changeHelp={changeHelp} helps={helps} isHelped={isHelped} />
            }
          </View>
        ) : (
          <View style={gameStyles.containerDataGame}>
            <QuestionPosition numberQuestion={numberQuestion + 1} amountQuestions={amountQuestions} />
            {
              isConnection &&
              <Helps changeHelp={changeHelp} helps={helps} isHelped={isHelped} />
            }
            <Time seconds={seconds} minutes={minutes} />
          </View>
        )
      }
    </>
  )
}

export default DataGame