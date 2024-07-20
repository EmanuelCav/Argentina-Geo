import { StyleSheet, Dimensions } from "react-native";

export const gameStyles = StyleSheet.create({

    gameContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginVertical: Dimensions.get("window").height / 52.85
    },

    containerQuestion: {
        width: '100%',
        height: '50%',
        borderColor: '#ffffff',
        borderWidth: 4,
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get("window").width / 45,
        backgroundColor: '#597EEE'
    },

    imageQuestion: {
        width: '100%',
        height: '100%'
    },

    containerTextGame: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100%',
    },

    textQuestionGame: {
        fontSize: Dimensions.get("window").height / 38,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '500'
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
        padding: Dimensions.get("window").height / 106
    },

    buttonOptions: {
        padding: Dimensions.get("window").height / 106,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginVertical: Dimensions.get("window").height / 61.66
    },

    containerDataGame: {
        width: '100%',
        padding: Dimensions.get("window").height / 106,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center'
    },

    textDataGame: {
        fontSize: Dimensions.get("window").height / 37,
        color: '#597EEE',
        textAlign: 'center'
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
        padding: Dimensions.get("window").height / 106,
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(89,126,238,0.5)',
        width: '100%',
        height: '100%',
        padding: Dimensions.get("window").height / 46.25,
        zIndex: 22
    },

    containFinish: {
        width: '88%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: '#597EEE',
        backgroundColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth: 3,
        padding: Dimensions.get("window").height / 106
    },

    containerDataFinish: {
        padding: Dimensions.get("window").height / 106
    },

    textHeaderGame: {
        fontSize: Dimensions.get("window").height / 29.63,
        color: '#fff',
        textAlign: 'center'
    },

    textFinishGame: {
        fontSize: Dimensions.get("window").height / 37,
        color: '#fff',
        textAlign: 'center'
    },

    textErrorsGame: {
        textAlign: 'center',
        fontSize: Dimensions.get("window").height / 29.63,
        color: '#597EEE',
        fontWeight: '600',
        marginVertical: Dimensions.get("window").height / 37
    },

    containerAnswer: {
        width: '100%',
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        borderWidth: 2,
        borderStyle: 'solid',
        paddingHorizontal: Dimensions.get("window").width / 60
    },

    headerAnswer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    showCorrect: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerHeaderQuestion: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containDataGame: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonHelpFinish: {
        borderRadius: 10,
        padding: Dimensions.get("window").height / 106,
        width: '66.66%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: Dimensions.get("window").height / 37
    },

    containHelpText: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    buttonHelp: {
        padding: Dimensions.get("window").height / 106,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth: 2,
        flexDirection: 'row'
    },

    textGame: {
        fontSize: Dimensions.get("window").height / 41,
        color: '#ffffff'
    }

})

export const configGamesStyles = StyleSheet.create({

    containerConfigGames: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 14,
        backgroundColor: '#9edefa',
        paddingVertical: Dimensions.get("window").height / 46.25,
        paddingHorizontal: Dimensions.get("window").width / 36
    },

    configGamesContain: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: Dimensions.get("window").height / 61.66,
        paddingHorizontal: Dimensions.get("window").width / 60
    },

    containShowConfig: {
        width: '100%',
        flex: 1,
        padding: Dimensions.get("window").height / 50
    },

    containShowConfigOptions: {
        width: '100%',
        flex: 1
    },

    containMoveCategories: {
        marginVertical: Dimensions.get("window").height / 52.85,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    iconMoveCategories: {
        fontSize: Dimensions.get("window").height / 33.63,
        fontWeight: '900',
        color: '#111'
    },

    iconMoveCategoriesDisable: {
        fontSize: Dimensions.get("window").height / 33.63,
        fontWeight: '900',
        color: '#888'
    },

})