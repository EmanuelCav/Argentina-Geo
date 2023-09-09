import { StyleSheet } from "react-native";

export const menuStyles = StyleSheet.create({

    // PLAY

    containerPlay: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%'
    },

    // CATEGORIES

    containerCategories: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        paddingVertical: 40,
        paddingHorizontal: 10,
        zIndex: 14
    },

    categoriesContain: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        padding: 12,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },

    // OPTIONS

    containOptionsSelector: {
        width: '100%',
        padding: 16,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },

    textTitleOptions: {
        fontSize: 26,
        color: '#597EEE',
        marginTop: 2,
        fontWeight: '600'
    },

    textQuestionOptions: {
        fontSize: 20
    },

    buttonOptions: {
        width: '50%',
        padding: 7,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#597EEE',
        height: 48,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButtonOptions: {
        fontSize: 22,
        color: '#597EEE',
        fontWeight: '600'
    }

})