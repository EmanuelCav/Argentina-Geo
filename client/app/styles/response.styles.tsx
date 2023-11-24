import { StyleSheet, Dimensions } from "react-native";

export const responseStyles = StyleSheet.create({

    // LOADING

    containerLoading: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 44
    },

    loadingIcon: {
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").height / 2
    },

    // ERROR

    containerMessage: {
        width: '100%'
    },

    message: {
        textAlign: 'center',
        fontSize: Dimensions.get("window").height / 46.25,
        color: "#DD0000"
    }

})
