import { View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { optionStyles } from "../../styles/options.styles";

import { SliderQuestionPropsType } from "../../types/options.types";
import { IOptions } from "../../interface/User";

const SliderQuestion = ({
  amountQuestions,
  setOptionsUser,
}: SliderQuestionPropsType) => {

  const decrease = () => {
    if (amountQuestions > 5) {
      setOptionsUser((optionData: IOptions) => ({
        ...optionData,
        amountQuestions: amountQuestions - 5,
      }));
    }
  };

  const increase = () => {
    if (amountQuestions < 30) {
      setOptionsUser((optionData: IOptions) => ({
        ...optionData,
        amountQuestions: amountQuestions + 5,
      }));
    }
  };

  return (
    <View style={optionStyles.containerSliderQuestion}>
      <Text style={optionStyles.textTitleOptions}>
        Selecciona la cantidad de preguntas
      </Text>

      <Text style={optionStyles.textQuestionOptions}>
        {amountQuestions}
      </Text>

      <View style={optionStyles.containerButtonsQuestions}>
        <Pressable
          onPress={decrease}
          disabled={amountQuestions === 5}
          style={({ pressed }) => [
            optionStyles.buttonQuestion,
            {
              opacity: amountQuestions === 5 ? 0.4 : 1,
              backgroundColor: pressed ? '#6b8cf2' : '#597EEE',
            },
          ]}
        >
          <Entypo name="minus" size={30} color="#fff" />
        </Pressable>

        <Pressable
          onPress={increase}
          disabled={amountQuestions === 30}
          style={({ pressed }) => [
            optionStyles.buttonQuestion,
            {
              opacity: amountQuestions === 30 ? 0.4 : 1,
              backgroundColor: pressed ? '#6b8cf2' : '#597EEE',
            },
          ]}
        >
          <Entypo name="plus" size={30} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default SliderQuestion;