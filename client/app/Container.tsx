import { ReactNode } from "react";
import { ImageBackground, StyleSheet } from 'react-native';

export default function Container({ children }: { children: ReactNode }) {
    return (
        <ImageBackground source={require('../assets/fondo2.png')} style={styles.container} resizeMode="cover">
            {children}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 6,
        flex: 1
    }
})
