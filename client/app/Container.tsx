import { ReactNode } from "react";
import { View, StyleSheet, Dimensions } from 'react-native';

export default function Container({ children }: { children: ReactNode }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: Dimensions.get('window').height,
        height: '100%',
        // width: Dimensions.get('window').width,
        width: '100%',
        padding: 11,
        backgroundColor: '#a93',
        // flex: 1
    }
})
