import { ReactNode } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const dimensionsSpace = Dimensions.get("window").height / 74

export default function Container({ children }: { children: ReactNode }) {
    return (
        <SafeAreaProvider>
            <SafeAreaWrapper>
                <ImageBackground source={require('../assets/fondo2.png')} style={styles.container} resizeMode="cover">
                    {children}
                </ImageBackground>
            </SafeAreaWrapper>
        </SafeAreaProvider>
    )
}

const SafeAreaWrapper = ({ children }: { children: ReactNode }) => {
    const insets = useSafeAreaInsets()

    return (
        <View style={[
            styles.container,
            {
                paddingTop: insets.top + dimensionsSpace,
                paddingBottom: insets.bottom + dimensionsSpace,
                paddingLeft: insets.left + dimensionsSpace,
                paddingRight: insets.right + dimensionsSpace,
            }
        ]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#90d5f6'
    }
})
