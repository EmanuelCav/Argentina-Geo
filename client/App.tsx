import React from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import Container from "./app/Container";
import Home from './app/routes/home.routes';
import Play from './app/routes/play.routes';
import Playing from "./app/routes/playing.routes";
import Ranking from "./app/routes/ranking.routes";

import store from "./app/server/store";
const persistor = persistStore(store)

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <Stack.Navigator initialRouteName='Home' screenOptions={{
              headerShown: false
            }}>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Play' component={Play} />
              <Stack.Screen name="Playing" component={Playing} />
              <Stack.Screen name="Ranking" component={Ranking} />
            </Stack.Navigator>
          </Container>
        </PersistGate>
      </Provider>
    </NavigationContainer >
  );
}
