import { StyleSheet } from "react-native";

export const newStyles = StyleSheet.create({

    containerNew: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12
    },

    newContain: {
        padding: 12,
        backgroundColor: '#597EEE',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    buttonSettings: {
        width: '100%',
        backgroundColor: '#597EEE',
        padding: 7,
        borderRadius: 4,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12
    },

    textButtonSettings: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 24,
        fontWeight: '500'
    }

})

export const authStyles = StyleSheet.create({

    containerAuth: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(89,126,238,0.7)',
        zIndex: 14,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 26
    },

    containerForm: {
        width: '100%',
        padding: 12,
        backgroundColor: '#ffffff'
    },

    separator: {
        marginTop: 12,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputAuth: {
        width: '100%',
        padding: 7,
        borderRadius: 12,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#597EEE',
        height: 48
    },

    labelForm: {
        fontSize: 22,
        margin: 2
    }

})

export const sectionStyle = StyleSheet.create({

    containerInputSettings: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 7,
        borderRadius: 4,
        borderColor: '#597EEE',
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12
    },

    containerInputSettingsDisabled: {
        width: '100%',
        backgroundColor: '#888',
        padding: 7,
        borderRadius: 4,
        borderColor: '#597EEE',
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12
    },

    textInput: {
        textAlign: 'center',
        color: '#597EEE',
        fontSize: 20,
        fontWeight: '500'
    },

    containerMoreSettings: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
    },

    containCode: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    textCode: {
        fontSize: 18
    },

    changeTextCode: {
        fontSize: 22,
        color: '#597EEE',
        marginTop: 2,
        fontWeight: '600'
    },

    containerSelect: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: 0,
        left: 0,
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        zIndex: 14
    },

    locationSelect: {
        width: '100%',
        padding: 7,
        borderWidth: 2,
        borderColor: "#597EEE",
        borderStyle: "solid",
        backgroundColor: "#fff"
    },

    locationSelected: {
        width: '100%',
        padding: 7,
        borderWidth: 2,
        borderColor: "#597EEE",
        borderStyle: "solid",
        backgroundColor: "#597EEE"
    },

    textLocationSelect: {
        fontSize: 18,
        color: "#597EEE"
    },

    textLocationSelected: {
        fontSize: 18,
        color: "#fff"
    }

})