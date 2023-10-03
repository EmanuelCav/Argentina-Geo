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
        padding: Dimensions.get("window").height/46.25,
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
        padding: Dimensions.get("window").height/46.25
    },

    userInfoLevel: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },

    userNickname: {
        fontSize: Dimensions.get("window").height/34,
    },

    userInfo: {
        fontSize: Dimensions.get("window").height/46,
    },

    containerLevel: {
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 20,
        marginTop: Dimensions.get("window").height/185,
        height: Dimensions.get("window").height/26,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageLevel: {
        width: Dimensions.get("window").width/8.5,
        height: Dimensions.get("window").height/24,
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
        fontSize: Dimensions.get("window").height/42
    },

    textLevel: {
        fontSize: Dimensions.get("window").height/42,
        fontWeight: '900',
    },

    // PROFILE

    imageLevelProfile: {
        width: Dimensions.get("window").width/8.5,
        height: Dimensions.get("window").height/24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerActionsView: {
        paddingHorizontal: Dimensions.get("window").width/30,
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
        paddingBottom: Dimensions.get("window").height/18.5,
        marginTop: Dimensions.get("window").height/123.66,
    },

    buttonAcceptOption: {
        width: '100%',
        backgroundColor: '#597EEE',
        padding: Dimensions.get("window").height/61.66,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonMenu: {
        width: '88%',
        backgroundColor: '#5d8cff',
        padding: Dimensions.get("window").height/61.66,
        borderRadius: 4,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get("window").height/18.5,
    },

    textButtonOption: {
        textAlign: 'center',
        color: '#fff',
        fontSize: Dimensions.get("window").height/31,
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