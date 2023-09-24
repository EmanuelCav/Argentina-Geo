import { TouchableOpacity, Text } from "react-native";

import { sectionStyle } from "../../../styles/settings.styles";

import { InputSettingsType } from "../../../types/props.types";

const InputSelect = ({ value, setIsPais, setIsProvincia, setIsMunicipio, isDisabled, location }: InputSettingsType) => {

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
        <TouchableOpacity style={sectionStyle.containerInputSettings} onPress={setLocation} disabled={isDisabled}>
            <Text style={sectionStyle.textInput}>{value}</Text>
        </TouchableOpacity>
    )
}

export default InputSelect