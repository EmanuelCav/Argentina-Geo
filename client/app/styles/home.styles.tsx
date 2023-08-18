import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({

    // USER

    containerUserHome: {
        height: 196,
        alignSelf: 'stretch',
        backgroundColor: '#f00'
    },

    // OPTIONS

    containerUserOption: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1
    },
    buttonUserOption: {
        width: 240,
        backgroundColor: '#597EEE',
        padding: 7,
        borderRadius: 4,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30
    },
    textButtonOption: {
        color: '#fff',
        fontSize: 20
    }

})