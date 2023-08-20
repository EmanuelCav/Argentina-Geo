import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({

    // USER

    containerUserHome: {
        height: '25%',
        backgroundColor: '#597EEE',
    },

    // OPTIONS

    containerUserOption: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        padding: 12,
        marginBottom: 48
    },
    buttonUserOption: {
        width: '80%',
        backgroundColor: '#597EEE',
        padding: 7,
        borderRadius: 4,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    },
    textButtonOption: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '500'
    }

})