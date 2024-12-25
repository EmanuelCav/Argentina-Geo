import { Dimensions, StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({

    profileContain: {
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

    containerMainInfoProfile: {
        width: '100%'
    },

    userInfoProfile: {
        fontSize: Dimensions.get("window").height / 46,
        color: '#597EEE',
        marginVertical: Dimensions.get("window").height / 233
    },

    containCategoryProfile: {
        borderColor: '#597EEE',
        borderWidth: 2,
        width: '100%',
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