import { StyleSheet } from "react-native";

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
        padding: 16,
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
        backgroundColor: '#5d8cff',
        padding: 16
    },

    userInfoLevel: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },

    userNickname: {
        fontSize: 24,
        fontFamily: '500'
    },

    userInfo: {
        fontSize: 18,
    },

    containerLevel: {
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 20,
        marginTop: 4,
        height: 30,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageLevel: {
        width: 42,
        height: 31,
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
        fontSize: 18
    },

    textLevel: {
        fontSize: 18,
        fontWeight: '900',
    },

    // PROFILE

    imageLevelProfile: {
        width: 42,
        height: 31,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerActionsView: {
        paddingHorizontal: 12,
        width: '100%'
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
        paddingBottom: 40,
        marginTop: 6
    },

    buttonAcceptOption: {
        width: '100%',
        backgroundColor: '#597EEE',
        padding: 12,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonMenu: {
        width: '88%',
        backgroundColor: '#5d8cff',
        padding: 12,
        borderRadius: 4,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    textButtonOption: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 24,
        fontWeight: '500'
    },

    // PLAY

    containerPlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export const rankingStyles = StyleSheet.create({

    containerRanking: {
        flex: 1,
        padding: 20
    },
    headerRanking: {
        textAlign: 'center',
        backgroundColor: '#597EEE',
        padding: 14,
        fontSize: 24,
        fontWeight: '500',
        borderColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    usersRanking: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#597EEE',
        padding: 4
    },
    userRanking: {
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 7,
        backgroundColor: '#6789f0',
        marginTop: 2
    },
    infoUserRank: {
        fontSize: 20
    }

})