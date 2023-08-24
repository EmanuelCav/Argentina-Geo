import AsyncStorage from '@react-native-async-storage/async-storage'

export const getUserData = async (): Promise<boolean> => {
    const user = await AsyncStorage.getItem('persist:arrgeo-user-games')

    if(user === null) {
        return false
    }

    return true
}