import { Dimensions, StyleSheet } from 'react-native'

export const configStyles = StyleSheet.create({

    configContain: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingVertical: Dimensions.get('window').height / 61.66,
        backgroundColor: '#ffffff',
        padding: Dimensions.get('window').height / 106
    }

})