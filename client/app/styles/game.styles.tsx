import { StyleSheet } from "react-native";

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
        paddingVertical: 44,
        paddingHorizontal: 10,
    },

    configGamesContain: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 12,
        paddingHorizontal: 6
    },

    containShowConfig: {
        width: '100%',
        flex: 1,
    },

    containMoveCategories: {
        marginTop: 24,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    iconMoveCategories: {
        fontSize: 22,
        fontWeight: '900',
        color: '#111'
    },

    iconMoveCategoriesDisable: {
        fontSize: 22,
        fontWeight: '900',
        color: '#888'
    }

})