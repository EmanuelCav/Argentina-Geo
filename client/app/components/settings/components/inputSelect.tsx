import { Text, Pressable } from "react-native";

import { sectionStyle } from "../../../styles/settings.styles";

import { InputSettingsType } from "../../../types/props.types";

const InputSelect = ({ value, setIsPais, setIsProvincia, setIsMunicipio, isDisabled, location, isConnection }: InputSettingsType) => {

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

        return

    }

    return (
        <Pressable style={isDisabled ? sectionStyle.containerInputSettingsDisabled : sectionStyle.containerInputSettings} 
        onPress={setLocation} disabled={isDisabled || !isConnection}>
            <Text style={sectionStyle.textInput}>{value}</Text>
        </Pressable>
    )
}

export default InputSelect