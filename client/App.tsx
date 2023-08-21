import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from 'react-redux'

import Container from "./app/Container";
import Home from './app/routes/home.routes';
import Play from './app/routes/play.routes';
import Playing from "./app/routes/playing.routes";
import Ranking from "./app/routes/ranking.routes";

import store from "./app/server/store";

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Provider store={store}>
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
      </Provider>
    </NavigationContainer>
  );
}
