import { Dimensions, StyleSheet } from "react-native";

export const optionStyles = StyleSheet.create({

    containerSliderQuestion: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '36%'
    },

    containerSelectOption: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },

    textTitleOptions: {
        fontSize: Dimensions.get('window').height / 34,
        color: '#597EEE',
        marginTop: Dimensions.get('window').height / 106,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center'
    },

    textQuestionOptions: {
        fontSize: Dimensions.get('window').height / 37,
        marginVertical: Dimensions.get("window").height / 106,
        fontFamily: 'Inter-SemiBold',
        color: '#597EEE'
    },

    buttonOptions: {
        width: '58%',
        padding: Dimensions.get('window').height / 106,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButtonOptions: {
        fontSize: Dimensions.get('window').height / 37,
        fontFamily: 'Inter-SemiBold'
    },

    containerButtonsQuestions: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%"
    },

    buttonQuestion: {
        width: 45,
        height: 45,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
    }
    
})
