import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({

    containerHome: {
        height: '100%'
    },

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