import { Dimensions, StyleSheet } from "react-native";

export const generalStyles = StyleSheet.create({

    containerInfoSelect: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column'
    },

    containSelector: {
        height: '50%',
        width: '100%',
        padding: Dimensions.get("window").height / 46.25,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center'
    }

})

export const homeStyles = StyleSheet.create({

    containerHome: {
        height: '100%'
    },

    // USER

    containerUserHome: {
        height: '30%',
        backgroundColor: '#597EEE',
        padding: Dimensions.get("window").height / 46.25
    },

    userInfoLevel: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },

    userNickname: {
        fontSize: Dimensions.get("window").height / 34,
        color: '#fff'
    },

    userInfo: {
        fontSize: Dimensions.get("window").height / 46,
        color: '#fff'
    },

    containerLevel: {
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 20,
        marginTop: Dimensions.get("window").height / 185,
        height: Dimensions.get("window").height / 26,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageLevel: {
        width: Dimensions.get("window").width / 8.5,
        height: Dimensions.get("window").height / 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0
    },

    containerLocationUser: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },

    textExp: {
        fontSize: Dimensions.get("window").height / 42,
        color: '#597EEE'
    },

    textLevel: {
        fontSize: Dimensions.get("window").height / 42,
        fontWeight: '900'
    },

    // PROFILE

    imageLevelProfile: {
        width: Dimensions.get("window").width / 8.5,
        height: Dimensions.get("window").height / 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerActionsView: {
        paddingHorizontal: Dimensions.get("window").width / 30,
        width: '100%'
    },

    containerMainInfoProfile: {
        paddingVertical: Dimensions.get("window").height / 106,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },

    userInfoProfile: {
        fontSize: Dimensions.get("window").height / 46,
        color: '#597EEE',
        marginVertical: Dimensions.get("window").height / 233
    },

    // OPTIONS

    containerUserOption: {
        flex: 1
    },

    containerMenuButtons: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        borderColor: '#597EEE',
        borderStyle: 'solid',
        borderWidth: 4,
        width: '100%',
        paddingBottom: Dimensions.get("window").height / 18.5,
        marginTop: Dimensions.get("window").height / 123.66,
    },

    buttonAcceptOption: {
        width: '100%',
        backgroundColor: '#597EEE',
        padding: Dimensions.get("window").height / 61.66,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonMenu: {
        width: '88%',
        backgroundColor: '#5d8cff',
        padding: Dimensions.get("window").height / 61.66,
        borderRadius: 4,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get("window").height / 18.5,
    },

    textButtonOption: {
        textAlign: 'center',
        color: '#fff',
        fontSize: Dimensions.get("window").height / 31,
        fontWeight: '500'
    },

    // PLAY

    containerPlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerIconUnlockCategory: {
        position: 'absolute',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconUnlockCategory: {
        left: '40%'
    }

})

export const rankingStyles = StyleSheet.create({

    containerRanking: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },

    rankingContain: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingVertical: Dimensions.get('window').height / 61.66,
        backgroundColor: '#ffffff',
        padding: Dimensions.get('window').height / 106
    },

    containerScrollRanking: {
        paddingHorizontal: Dimensions.get('window').width / 25.5,
        paddingVertical: Dimensions.get('window').height / 24.66,
        top: 0,
        left: 0,
        zIndex: 16,
        position: 'absolute',
        height: Dimensions.get('window').height - Dimensions.get("window").height / 60 * 2 - Dimensions.get("window").height / 61.66 * 2 - Dimensions.get('window').height / 24.66 * 2,
        width: '100%'
    },

    userRanking: {
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: Dimensions.get('window').height / 106,
        paddingVertical: Dimensions.get('window').height / 67.27,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#597EEE',
        borderStyle: 'solid'
    },

    containerFilterRanking: {

    },

    containerDateRank: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: "#597EEE",
        borderStyle: 'solid',
        marginBottom: Dimensions.get('window').height / 360
    },

    buttonDateRank: {
        padding: Dimensions.get('window').height / 106,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonDateRankSelected: {
        padding: Dimensions.get('window').height / 106,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5d8cff'
    },

    infoUserRank: {
        fontSize: Dimensions.get('window').height / 41.11,
        color: '#5d8cff',
        textAlign: 'center'
    },

    infoUserRankSelected: {
        fontSize: Dimensions.get('window').height / 41.11,
        color: '#fff',
        textAlign: 'center'
    }

})