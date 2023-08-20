import { Text, TouchableOpacity } from "react-native";

import { homeStyles } from '../styles/home.styles'

import { ButtonNavigateProps } from "../types/props.types";

const ButtonMenu = ({ text, redirect }: ButtonNavigateProps) => {
  return (
    <TouchableOpacity style={homeStyles.buttonUserOption} onPress={redirect} >
      <Text style={homeStyles.textButtonOption}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonMenu