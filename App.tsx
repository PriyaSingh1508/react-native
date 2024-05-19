import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import AddExpense from './src/screens/AddExpense';
import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  AddExpense:undefined;
};
const RootStack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  

  return (
    <NavigationContainer>
    <RootStack.Navigator>
    <RootStack.Screen
      name="Home"
      component={Home}
      options={{title: 'Welcome'}}
    />
    <RootStack.Screen name="AddExpense" component={AddExpense} />
  </RootStack.Navigator>
   
  </NavigationContainer>
  );
}



export default App;
