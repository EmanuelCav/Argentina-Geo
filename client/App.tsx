import { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from 'react-redux'
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { PersistGate } from 'redux-persist/integration/react'

import Home from './app/routes/home.routes';
import Play from './app/routes/play.routes';
import Playing from "./app/routes/playing.routes";
import Ranking from "./app/routes/ranking.routes";
import Settings from './app/routes/settings.routes'
import Tent from './app/routes/tent.routes'
import Categories from './app/routes/categories.routes'
import Profile from './app/routes/profile.routes'
import Options from './app/routes/options.routes'

import LoadingSplash from './app/components/response/LoadingSplash';

import store from "./app/server/store";
import { persistor } from "./app/server/store";

const Stack = createNativeStackNavigator();

(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.style = {
  fontFamily: 'Inter-Regular',
};

export default function App() {

  const [appReady, setAppReady] = useState<boolean>(false)

  useEffect(() => {
    const prepareApp = async () => {

      try {

        await Font.loadAsync({
          'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
          'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
          'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
          'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf')
        });

        await new Promise(resolve => setTimeout(resolve, 2000))

      } catch (e) {
        console.warn(e)
      } finally {
        setAppReady(true)
        await SplashScreen.hideAsync()
      }
    }

    prepareApp()
  }, [])

  if (!appReady) {
    return <LoadingSplash />
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle={"dark-content"} />
          <Stack.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false
          }} >
            <Stack.Screen name='Home' component={Home} options={{
              animation: 'none'
            }} />
            <Stack.Screen name='Play' component={Play} options={{
              animation: 'fade'
            }} />
            <Stack.Screen name="Playing" component={Playing as any} options={{
              animation: 'fade'
            }} />
            <Stack.Screen name="Ranking" component={Ranking} options={{
              animation: 'fade'
            }} />
            <Stack.Screen name="Settings" component={Settings} options={{
              animation: 'fade'
            }} />
            <Stack.Screen name="Tent" component={Tent} options={{
              animation: 'fade'
            }} />
            <Stack.Screen name="Categories" component={Categories} options={{
              animation: 'fade'
            }} />
            <Stack.Screen name="Profile" component={Profile} options={{
              animation: 'fade'
            }} />
            <Stack.Screen name="Options" component={Options} options={{
              animation: 'fade'
            }} />
          </Stack.Navigator>
        </NavigationContainer >
      </PersistGate>
    </Provider>
  );
}
