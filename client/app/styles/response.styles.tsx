import { StyleSheet, Dimensions } from "react-native";

export const responseStyles = StyleSheet.create({

    // LOADING

    containerMainLoading: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 44
    },

    containerLoading: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
