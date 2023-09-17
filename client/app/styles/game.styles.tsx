import { StyleSheet } from "react-native";

export const gameStyles = StyleSheet.create({

    gameContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },

    containerQuestion: {
        width: '100%',
        height: '50%',
        borderColor: '#222222',
        borderWidth: 4,
        borderStyle: 'solid',
    },

    imageQuestion: {
        width: '100%',
        height: '100%'
    },

    containerOptions: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonOptions: {
        width: '50%',
        padding: 7,
        borderRadius: 12,
        backgroundColor: '#597EEE',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 6,
        height: 100
    },

    textButtonOptions: {
        fontSize: 16,
        color: '#FFFFFF'
    }

})