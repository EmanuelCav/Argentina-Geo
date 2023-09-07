import { TouchableOpacity, Text } from "react-native";

import { sectionStyle } from "../../../styles/settings.styles";

const InputSelect = ({ value }: { value: string }) => {
    return (
        <TouchableOpacity style={sectionStyle.containerInputSettings}>
            <Text style={sectionStyle.textInput}>{value}</Text>
        </TouchableOpacity>
    )
}

export default InputSelect