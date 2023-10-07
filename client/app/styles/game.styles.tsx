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
        borderColor: '#5d8cff',
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },

    containerSectionOptions: {
        width: '50%',
        height: '100%',
        padding: Dimensions.get("window").height/106
    },

    buttonOptions: {
        padding: Dimensions.get("window").height/106,
        borderRadius: 12,
        backgroundColor: '#597EEE',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginVertical: Dimensions.get("window").height/61.66
    },

    containerDataGame: {
        width: '100%',
        padding: Dimensions.get("window").height/106,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center'
    },

    textDataGame: {
        fontSize: Dimensions.get("window").height/37,
        color: '#597EEE'
    },

    containerCorrect: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 14,
        backgroundColor: '#0f0',
        opacity: 0.4,
        width: '100%',
        height: '100%'
    },

    containerIncorrect: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 14,
        backgroundColor: '#f00',
        opacity: 0.4,
        width: '100%',
        height: '100%'
    },

    containerPreFinish: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 14,
        backgroundColor: 'rgba(89, 205, 238, 0.4)',
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    containPreFinish: {
        padding: Dimensions.get("window").height/106,
        backgroundColor: '#597EEE',
        width: '66%',
        height: '22%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#5d8cff',
        borderStyle: 'solid',
    },

    containerFinish: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 14,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        padding: Dimensions.get("window").height/46.25,
    },

    containerDataFinish: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textHeaderGame: {
        fontSize: Dimensions.get("window").height/29.63,
        color: '#fff',
        textAlign: 'center'
    },

    textFinishGame: {
        fontSize: Dimensions.get("window").height/37,
        color: '#fff',
        textAlign: 'center'
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
        flex: 1
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