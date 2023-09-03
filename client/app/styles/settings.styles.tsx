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
        backgroundColor: 'rgba(89,126,238,0.9)',
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
        fontSize: 18,
        margin: 2
    }

})