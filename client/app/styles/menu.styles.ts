import { StyleSheet, Dimensions } from "react-native";

export const menuStyles = StyleSheet.create({

    containerScroll: {
        flex: 1
    },

    showCategoriesContain: {
        width: '100%',
        flex: 1,
        flexDirection: 'column'
    },

    categoryContainer: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#597EEE',
        borderStyle: 'solid',
        padding: Dimensions.get('window').height / 106
    },

    textCategory: {
        fontSize: Dimensions.get('window').height / 43.53,
        color: '#597EEE',
        maxWidth: '90%'
    },

})