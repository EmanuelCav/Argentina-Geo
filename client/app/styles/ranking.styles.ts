import { Dimensions, StyleSheet } from "react-native";

export const rankingStyles = StyleSheet.create({

    rankingContain: {
        width: '100%',
        flex: 1,
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
        borderStyle: 'solid',
        height: Dimensions.get("window").height / 13.58
    },

    userRankingMe: {
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: Dimensions.get('window').height / 106,
        paddingVertical: Dimensions.get('window').height / 67.27,
        backgroundColor: '#B0C4DE',
        borderWidth: 2,
        borderColor: '#597EEE',
        borderStyle: 'solid',
        height: Dimensions.get("window").height / 13.58
    },

    containerUserRank: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    topUser: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '66%'
    },

    containerDateRank: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: "#597EEE",
        borderStyle: 'solid',
        marginBottom: Dimensions.get('window').height / 360,
        height: Dimensions.get('window').height / 13.58
    },

    buttonDateRank: {
        padding: Dimensions.get('window').height / 106,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },

    buttonDateRankSelected: {
        padding: Dimensions.get('window').height / 106,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5d8cff',
        height: '100%'
    },

    topUserRank: {
        fontSize: Dimensions.get('window').height / 41.11,
        color: '#5d8cff',
        textAlign: 'center',
        fontWeight: '600',
        marginRight: Dimensions.get("window").width / 60
    },

    containExpUser: {
        maxWidth: '34%'
    },

    containerHeaderRank: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: Dimensions.get("window").height / 106
    },

    infoUserRank: {
        fontSize: Dimensions.get('window').height / 41.11,
        textAlign: 'center'
    },

    userRank: {
        fontSize: Dimensions.get('window').height / 41.11,
        textAlign: 'center',
        color: "#597EEE"
    },

    pointsUserRank: {
        fontSize: Dimensions.get('window').height / 41.11,
        color: '#5d8cff',
        textAlign: 'right'
    },

    textNoUsers: {
        textAlign: 'center',
        color: "#597EEE",
        fontSize: Dimensions.get("window").height / 46.25,
        marginTop: Dimensions.get("window").height / 240
    }

})