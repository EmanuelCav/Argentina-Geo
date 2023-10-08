import { View, Text } from "react-native";

import { responseStyles } from '../../styles/response.styles';

const Error = ({ msg }: { msg: string }) => {

    return (
        <View style={responseStyles.containerMessage}>
            <Text style={responseStyles.message}>{msg}</Text>
        </View>
    )
}

export default Error