import { Text, Pressable } from "react-native";

import { InputSelectPropsType } from "../../../types/settings.types";

import { settingsStyles } from "../../../styles/settings.styles";

const InputSelect = ({ value, setIsPais, setIsProvincia, setIsMunicipio, isDisabled, location }: InputSelectPropsType) => {

    const setLocation = () => {
    
        if(location === "Pais") {
            setIsPais(true)
            setIsProvincia(false)
            setIsMunicipio(false)
            return
        }
        
        if(location === "Provincia") {
            setIsPais(false)
            setIsProvincia(true)
            setIsMunicipio(false)
            return
        }

        if(location === "Municipio") {
            setIsPais(false)
            setIsProvincia(false)
            setIsMunicipio(true)
            return
        }

    }

    return (
        <Pressable style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#dddddd' : isDisabled ? '#888888' : '#ffffff',
              }, settingsStyles.containerInputSettings]}
        onPress={setLocation} disabled={isDisabled}>
            <Text style={settingsStyles.textInput}>{value}</Text>
        </Pressable>
    )
}

export default InputSelect