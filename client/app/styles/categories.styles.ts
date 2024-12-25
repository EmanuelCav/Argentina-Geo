import { StyleSheet, Dimensions } from "react-native";

export const categoriesStyles = StyleSheet.create({

    containerActionsCategories: {
        marginBottom: Dimensions.get("window").height / 74,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },

    containerShowCategories: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },

    containCategories: {
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

    containCategory: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get("window").width / 36,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ffffff'
    },

    categoryText: {
        color: '#ffffff',
        fontSize: Dimensions.get("window").height / 50
    },

    buttonActionCategory: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Dimensions.get("window").height / 106,
        borderColor: '#ffffff',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '40%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    textButtonActionCategory: {
        color: '#ffffff',
        fontWeight: '500',
        fontSize: Dimensions.get("window").height / 46
    },

})