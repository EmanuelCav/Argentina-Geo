import { Pressable, Text } from "react-native";

import { generalStyles } from "../../styles/general.styles";

import { ButtonMenuPropsType } from "../../types/props.types";

const ButtonMenu = ({ text, redirect, disabled }: ButtonMenuPropsType) => {
  return (
    <Pressable style={({ pressed }) => [
      {
        backgroundColor: pressed ? '#6b8cf2' : disabled ? '#dddddd' : '#597EEE',
      },
      generalStyles.buttonMenu]} onPress={redirect} disabled={disabled}>
      <Text style={generalStyles.buttonMenuText}>{text}</Text>
    </Pressable>
  )
}

export default ButtonMenu