import { StyleSheet, Dimensions } from "react-native";

export const menuStyles = StyleSheet.create({

    // CATEGORIES

    containerCategories: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(89, 205, 238, 0.9)',
        paddingVertical: Dimensions.get('window').height / 16.81,
        paddingHorizontal: Dimensions.get('window').width / 36,
        zIndex: 14,
    },

    categoriesContain: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width - Dimensions.get('window').width / 36 * 2 - Dimensions.get("window").width / 60 * 2,
        height: Dimensions.get('window').height - Dimensions.get('window').height / 16.81 * 2 - Dimensions.get("window").height / 60 * 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingVertical: Dimensions.get('window').height / 61.66
    },

    containerScroll: {
        paddingHorizontal: Dimensions.get('window').width / 25.5,
        paddingVertical: Dimensions.get('window').height / 24.66,
        top: 0,
        left: 0,
        zIndex: 16,
        position: 'absolute',
        height: Dimensions.get('window').height - Dimensions.get('window').height / 16.81 * 2 - Dimensions.get("window").height / 60 * 2 - Dimensions.get('window').height / 24.66 * 2,
        width: Dimensions.get('window').width - Dimensions.get('window').width / 36 * 2 - Dimensions.get("window").width / 60 * 2
    },

    showCategoriesContain: {
        width: '100%',
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'column'
    },

    categoryContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#597EEE',
        borderStyle: 'solid',
        padding: Dimensions.get('window').height / 106
    },

    categoryContainerUnlocked: {
        flex: 1,
        width: '100%',
        backgroundColor: '#597EEE',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
        padding: Dimensions.get('window').height / 106
    },

    textCategory: {
        fontSize: Dimensions.get('window').height / 43.53,
        color: '#597EEE'
    },

    textCategoryUnlocked: {
        fontSize: Dimensions.get('window').height / 43.53,
        color: '#FFFFFF'
    },

    // OPTIONS

    containQuestionSelector: {
        width: '100%',
        padding: Dimensions.get('window').height / 46.25,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '36%'
    },

    containOptionsSelector: {
        width: '100%',
        padding: Dimensions.get('window').height / 46.25,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        height: '56%'
    },

    textTitleOptions: {
        fontSize: Dimensions.get('window').height / 28.45,
        color: '#597EEE',
        marginTop: Dimensions.get('window').height / 370,
        fontWeight: '600',
        textAlign: 'center'
    },

    textQuestionOptions: {
        fontSize: Dimensions.get('window').height / 37
    },

    buttonOptions: {
        width: '58%',
        padding: Dimensions.get('window').height / 106,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#597EEE',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonOptionsSelected: {
        width: '58%',
        padding: Dimensions.get('window').height / 106,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '#597EEE',
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButtonOptions: {
        fontSize: Dimensions.get('window').height / 33.63,
        color: '#597EEE',
        fontWeight: '600'
    },

    textButtonOptionsSelected: {
        fontSize: Dimensions.get('window').height / 33.63,
        color: '#FFFFFF',
        fontWeight: '600'
    },

    // PROFILE

    containFlagNickname: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    textNicknameProfile: {
        fontSize: Dimensions.get('window').height / 41.11,
        marginLeft: Dimensions.get('window').width / 30,
        color: '#111111',
        fontWeight: '600'
    },

    containCategoryProfile: {
        borderColor: '#597EEE',
        borderWidth: 2,
        borderStyle: 'solid',
        padding: Dimensions.get('window').height / 106,
        marginVertical: Dimensions.get('window').height / 185
    },

    categoryProfile: {
        fontSize: Dimensions.get('window').height / 41.11,
        fontWeight: '600',
        color: "#111111"
    }

})