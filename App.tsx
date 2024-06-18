import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from "./src/screens/HomeScreen.tsx";
import 'react-native-gesture-handler';
import { HistoryScreen } from "./src/screens/HistoryScreen.tsx";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Активные задачи" component={HomeScreen} />
          <Drawer.Screen name="История" component={HistoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
  );
}
export default App;
