import AsyncStorage from '@react-native-async-storage/async-storage'
import { EXPO_STORAGE } from '@env';

export const getUserData = async (): Promise<boolean> => {
    const user = await AsyncStorage.getItem(`${EXPO_STORAGE}`)

    if(user === null) {
        return false
    }

    return true
}