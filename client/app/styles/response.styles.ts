import { StyleSheet, Dimensions } from "react-native";

export const responseStyles = StyleSheet.create({

    containerMainLoading: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#90d5f6',
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingIcon: {
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").height / 2
    },

    containerMessage: {
        width: '100%'
    },

    message: {
        textAlign: 'center',
        fontSize: Dimensions.get("window").height / 46.25,
        color: "#DD0000"
    }

})
