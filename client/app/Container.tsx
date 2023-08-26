import { ReactNode } from "react";
import { View, StyleSheet } from 'react-native';

export default function Container({ children }: { children: ReactNode }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
})
