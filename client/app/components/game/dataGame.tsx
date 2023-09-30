import { View, Text } from 'react-native';

import { gameStyles } from '../../styles/game.styles';

import { GameDataProps } from '../../types/props.types';

const DataGame = ({ numberQuestion, amountQuestions, seconds, minutes }: GameDataProps) => {
  return (
    <View style={gameStyles.containerDataGame}>
      <Text style={gameStyles.textDataGame}>{numberQuestion + 1}/{amountQuestions}</Text>
      <>
        {
          seconds <= 9 ? (
            <>
              {
                minutes <= 9 ? (
                  <Text style={gameStyles.textDataGame}>0{minutes}:0{seconds}</Text>
                ) : (
                  <Text style={gameStyles.textDataGame}>{minutes}:0{seconds}</Text>
                )
              }
            </>
          ) : (
            <>
              {
                minutes <= 9 ? (
                  <Text style={gameStyles.textDataGame}>0{minutes}:{seconds}</Text>
                ) : (
                  <Text style={gameStyles.textDataGame}>{minutes}:{seconds}</Text>
                )
              }
            </>
          )
        }
      </>
    </View>
  )
}

export default DataGame