import { Text, TouchableOpacity } from "react-native";

import { homeStyles } from '../styles/home.styles'

import { ButtonGameProps } from "../types/props.types";

const ButtonMenu = ({ text, redirect, isAccept }: ButtonGameProps) => {
  return (
    <TouchableOpacity style={isAccept ? homeStyles.buttonAcceptOption : homeStyles.buttonMenu } onPress={redirect} >
      <Text adjustsFontSizeToFit numberOfLines={1} style={homeStyles.textButtonOption}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonMenu