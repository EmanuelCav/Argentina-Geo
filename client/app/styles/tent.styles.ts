import { Dimensions, StyleSheet } from "react-native";

export const tentStyle = StyleSheet.create({

    containerHeaderTent: {
        height: '18%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    },

    textTitleTent: {
        fontSize: Dimensions.get("window").height / 31,
        color: '#597EEE',
        fontWeight: '500',
        textAlign: 'center'
    },

    imageTitleTent: {
        height: '100%',
        width: '100%'
    },

    containerEventTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: Dimensions.get("window").height / 37,
        width: '50%',
        height: '100%'
    },

    containerMenuTent: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column'
    },

    containElement: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },

    titleElement: {
        fontSize: Dimensions.get("window").height / 41,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: Dimensions.get("window").height / 106
    },

    priceElement: {
        fontSize: Dimensions.get("window").height / 47,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: Dimensions.get("window").height / 106
    },

    buttonMenu: {
        padding: Dimensions.get("window").height / 74,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth: 2,
        width: '66.66%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    buttonMenuText: {
        fontSize: Dimensions.get("window").height / 41,
        color: '#ffffff',
        fontWeight: '500'
    },

})