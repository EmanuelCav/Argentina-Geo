import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

import { homeStyles } from '../styles/home.styles'

import { ButtonGameProps } from "../types/props.types";

const ButtonMenu = ({ text, redirect, isAccept, isCategory }: ButtonGameProps) => {
  return (
    <TouchableOpacity style={isAccept ? homeStyles.buttonAcceptOption : homeStyles.buttonMenu } onPress={redirect} >
      {
        isCategory && 
        <View style={homeStyles.containerIconUnlockCategory}>
          <AntDesign name="unlock" selectable={undefined} color={"#fff"} style={homeStyles.iconUnlockCategory} size={Dimensions.get('window').height / 37} />
        </View>
      }
      <Text adjustsFontSizeToFit numberOfLines={1} style={homeStyles.textButtonOption}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonMenu