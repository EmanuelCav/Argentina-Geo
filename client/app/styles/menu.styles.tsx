import { StyleSheet } from "react-native";

export const menuStyles = StyleSheet.create({

    // PLAY

    containerPlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // CATEGORIES

    containerCategories: {
        width: '100%',
        height: '100%',
        position: 'absolute',
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

    containerCategory: {

    },

    textCategory: {

    },

    buttonCategory: {

    }

})