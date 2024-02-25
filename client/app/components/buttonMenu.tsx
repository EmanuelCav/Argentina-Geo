import { Text, TouchableOpacity } from "react-native";

import { homeStyles } from '../styles/home.styles'

import { ButtonGameProps } from "../types/props.types";

const ButtonMenu = ({ text, redirect, isAccept, disabled }: ButtonGameProps) => {
  return (
    <TouchableOpacity style={isAccept ? [homeStyles.buttonAcceptOption, { backgroundColor: disabled ? '#dddddd' : '#597EEE' }] 
    : [homeStyles.buttonMenu, { backgroundColor: disabled ? '#dddddd' : '#5d8cff' }]} 
    onPress={redirect} disabled={disabled}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={homeStyles.textButtonOption}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonMenu