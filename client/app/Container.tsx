import { ReactNode } from "react";
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';

export default function Container({ children }: { children: ReactNode }) {
    return (
        <ImageBackground source={require('../assets/fondo2.png')} style={styles.container} resizeMode="cover">
            {children}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: Dimensions.get("window").height/60,
        paddingHorizontal: Dimensions.get("window").width/60,
        flex: 1
    }
})
