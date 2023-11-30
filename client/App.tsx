import React from 'react'
import { StatusBar } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import Container from "./app/Container";

import Home from './app/routes/home.routes';
import Play from './app/routes/play.routes';
import Playing from "./app/routes/playing.routes";
import Ranking from "./app/routes/ranking.routes";
import Settings from './app/routes/settings.routes'
import Loading from './app/components/response/loading';

import store from "./app/server/store";

const persistor = persistStore(store)

export default function App() {

  const Stack = createNativeStackNavigator()

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    },
  };

  return (
    <Container>
      <NavigationContainer theme={MyTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar backgroundColor={'#90d5f6'} />
            <Loading />
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
            </Stack.Navigator>
          </PersistGate>
        </Provider>
      </NavigationContainer >
    </Container>
  );
}
