import { StyleSheet, Dimensions } from "react-native";

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

export const configGamesStyles = StyleSheet.create({

    containerConfigGames: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(89, 205, 238, 0.9)',
        zIndex: 14,
        paddingVertical: Dimensions.get("window").height/16.81,
        paddingHorizontal: Dimensions.get("window").width/36
    },

    configGamesContain: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: Dimensions.get("window").height/61.66,
        paddingHorizontal: Dimensions.get("window").width/60
    },

    containShowConfig: {
        width: '100%',
        flex: 1,
    },

    containMoveCategories: {
        marginVertical: Dimensions.get("window").height/52.85,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    iconMoveCategories: {
        fontSize: Dimensions.get("window").height/33.63,
        fontWeight: '900',
        color: '#111'
    },

    iconMoveCategoriesDisable: {
        fontSize: Dimensions.get("window").height/33.63,
        fontWeight: '900',
        color: '#888'
    }

})