import { StyleSheet } from "react-native";

export const menuStyles = StyleSheet.create({

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
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        padding: 12,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },

    showCategoriesContain: {
        width: '100%'
    },

    categoryContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#597EEE',
        borderStyle: 'solid',
        padding: 7,
    },

    categoryContainerUnlocked: {
        width: '100%',
        backgroundColor: '#597EEE',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
        padding: 7,
    },

    textCategory: {
        fontSize: 20,
        color: '#597EEE'
    },

    textCategoryUnlocked: {
        fontSize: 20,
        color: '#FFFFFF'
    },

    // OPTIONS

    containQuestionSelector: {
        width: '100%',
        padding: 16,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '36%'
    },

    containOptionsSelector: {
        width: '100%',
        padding: 16,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        height: '56%'
    },

    textTitleOptions: {
        fontSize: 26,
        color: '#597EEE',
        marginTop: 2,
        fontWeight: '600',
        textAlign: 'center'
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
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonOptionsSelected: {
        width: '50%',
        padding: 7,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '#597EEE',
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButtonOptions: {
        fontSize: 22,
        color: '#597EEE',
        fontWeight: '600'
    },

    textButtonOptionsSelected: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600'
    }

})