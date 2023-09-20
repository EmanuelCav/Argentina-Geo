import { StyleSheet, Dimensions } from "react-native";

export const menuStyles = StyleSheet.create({

    // CATEGORIES

    containerCategories: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(89, 205, 238, 0.9)',
        paddingVertical: 44,
        paddingHorizontal: 10,
        zIndex: 14,
    },

    categoriesContain: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width - 10 * 2 - 6 * 2,
        height: Dimensions.get('window').height - 44 * 2 - 12 * 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingVertical: 12
    },

    containerScroll: {
        paddingHorizontal: 14,
        paddingVertical: 42,
        top: 0,
        left: 0,
        zIndex: 16,
        position: 'absolute',
        height: Dimensions.get('window').height - 44 * 2 - 12 * 2 - 42 * 2,
        width: Dimensions.get('window').width - 10 * 2 - 6 * 2
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