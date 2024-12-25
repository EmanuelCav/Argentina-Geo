import { Dimensions, StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({

    containerUser: {
        height: '25%',
        backgroundColor: '#597EEE',
        padding: Dimensions.get("window").height / 46.25,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },

    flagNickname: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    imageHome: {
        height: '100%',
        width: Dimensions.get("window").width / 8
    },

    userNickname: {
        fontSize: Dimensions.get("window").height / 34,
        color: '#fff',
        marginLeft: Dimensions.get("window").width / 36
    },

    userInfo: {
        fontSize: Dimensions.get("window").height / 46,
        color: '#fff'
    },

    containerLevel: {
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 20,
        marginTop: Dimensions.get("window").height / 185,
        height: Dimensions.get("window").height / 26,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageLevel: {
        width: Dimensions.get("window").width / 8.5,
        height: Dimensions.get("window").height / 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0
    },

    containerLocationUser: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },

    textExp: {
        fontSize: Dimensions.get("window").height / 42,
        color: '#597EEE'
    },

    textLevel: {
        fontSize: Dimensions.get("window").height / 42,
        fontWeight: '900'
    },

    // PROFILE

    imageLevelProfile: {
        width: Dimensions.get("window").width / 8.5,
        height: Dimensions.get("window").height / 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerMainInfoProfile: {
        paddingVertical: Dimensions.get("window").height / 106,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },

    containerUserOption: {
        flex: 1
    },

    containerIconUnlockCategory: {
        position: 'absolute',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconUnlockCategory: {
        left: '40%'
    }

})
