import { Dimensions, StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({

    containerNew: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Dimensions.get("window").height / 62,
    },

    newContain: {
        padding: Dimensions.get("window").height / 62,
        backgroundColor: '#597EEE',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    containerSelector: {
        width: '100%',
        height: '50%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    buttonSettings: {
        width: '100%',
        backgroundColor: '#597EEE',
        padding: Dimensions.get("window").height / 106,
        borderRadius: 4,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: Dimensions.get("window").height / 62,
    },

    textButtonSettings: {
        textAlign: 'center',
        color: '#fff',
        fontSize: Dimensions.get("window").height / 31,
        fontWeight: '500'
    },

    containerAuth: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(89, 126, 238, 0.7)',
        zIndex: 14,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get("window").width / 32.5,
        margin: Dimensions.get("window").height / 74
    },

    containerForm: {
        width: '100%',
        padding: Dimensions.get("window").height / 62,
        backgroundColor: '#ffffff'
    },

    separator: {
        marginTop: Dimensions.get("window").height / 62,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputAuth: {
        width: '100%',
        padding: Dimensions.get("window").height / 106,
        borderRadius: 12,
        fontSize: Dimensions.get("window").height / 41.11,
        borderWidth: 1,
        borderColor: '#597EEE',
        height: Dimensions.get("window").height / 15.5
    },

    inputAuthFocused: {
        shadowColor: "#597EEE",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        width: '100%',
        padding: Dimensions.get("window").height / 106,
        borderRadius: 12,
        fontSize: Dimensions.get("window").height / 41.11,
        borderWidth: 1,
        borderColor: '#597EEE',
        height: Dimensions.get("window").height / 15.5
    },

    labelForm: {
        fontSize: Dimensions.get("window").height / 39.33,
        fontWeight: '500',
        marginBottom: Dimensions.get("window").height / 106
    },

    containerInputSettings: {
        padding: Dimensions.get("window").height / 74,
        borderRadius: 4,
        borderColor: '#597EEE',
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    textInput: {
        textAlign: 'center',
        color: '#597EEE',
        fontSize: Dimensions.get("window").height / 37,
        fontWeight: '500'
    },

    containerMoreSettings: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    textCode: {
        fontSize: Dimensions.get("window").height / 41.11,
    },

    changeTextCode: {
        fontSize: Dimensions.get("window").height / 41,
        color: '#597EEE',
        marginTop: Dimensions.get("window").height / 370,
        fontWeight: '600'
    },

    containerSelect: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: 0,
        left: 0,
        width: '100%',
        flexDirection: 'column',
        zIndex: 14,
        height: '100%',
        margin: Dimensions.get("window").height / 74,
        padding: Dimensions.get("window").height / 74
    },

    locationSelect: {
        width: '100%',
        padding: Dimensions.get("window").height / 106,
        borderWidth: 2,
        borderColor: "#597EEE",
        borderStyle: "solid",
        backgroundColor: "#fff"
    },

    locationSelected: {
        width: '100%',
        padding: Dimensions.get("window").height / 106,
        borderWidth: 2,
        borderColor: "#597EEE",
        borderStyle: "solid",
        backgroundColor: "#597EEE"
    },

    textLocationSelect: {
        fontSize: Dimensions.get("window").height / 41.11,
        color: "#597EEE"
    },

    textLocationSelected: {
        fontSize: Dimensions.get("window").height / 41.11,
        color: "#fff"
    }

})