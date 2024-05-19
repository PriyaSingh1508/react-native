import {createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { NavigationContainer,useNavigation,DrawerActions } from '@react-navigation/native';
import React from 'react';
import { StyleSheet} from 'react-native';
import { ContactList } from './src/screen/ContactList.tsx';
import {FavoriteContact} from './src/screen/FavoriteContact'; 
import { CreateContact } from './src/screen/CreateContact';
import { UpdateContact } from './src/screen/UpdateContact';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Entypo';
import {MyDrawerItems} from './src/utility/DrawerContent.tsx';
export type RootStackParamList = {
  ContactList: undefined;
  CreateContact:undefined;
  UpdateContact: { contactId: number };
  FavoriteContact:undefined;
}
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();
const DrawerNav = () => {
  const navigation=useNavigation();
  return (
    <Drawer.Navigator screenOptions={{headerShown:false}}  drawerContent={() => <MyDrawerItems/>}>
      <Drawer.Screen name="Contact List" component={StackNav} options={{  headerShown: false }}/>
      {/* <Drawer.Screen name="Favorite Contact" component={FavoriteContact} options={{  headerShown: true }}/> */}

    </Drawer.Navigator>
  );
};

const StackNav=() => {
  const navigation=useNavigation();
 return (
  <Stack.Navigator screenOptions={{headerLeft:()=>{return(
    <Icon
    name="menu" size={30} color="black" onPress={()=>{navigation.dispatch(DrawerActions.openDrawer)}}/>
  )}}}>
     <Stack.Screen name="ContactList" component={ContactList} />
     <Stack.Screen name="FavoriteContact" component={FavoriteContact} />
  <Stack.Screen name="CreateContact" component={CreateContact} />
  <Stack.Screen name="UpdateContact" component={UpdateContact} />
</Stack.Navigator>
 );
};

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
        <DrawerNav/>
     
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
