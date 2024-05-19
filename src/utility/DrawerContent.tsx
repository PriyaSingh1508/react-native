import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../../App';
import { NavigationProp } from '@react-navigation/native';
type DrawerItemProps = {
    label: keyof RootStackParamList;
    navigateTo: keyof RootStackParamList;
  };
  
  type DrawerNavigationProp = NavigationProp<RootStackParamList>;
const DrawerList: DrawerItemProps[] = [
  {  label: 'ContactList', navigateTo: 'ContactList' },
  {  label: 'FavoriteContact', navigateTo: 'FavoriteContact' },
 
];

const DrawerLayout: React.FC<DrawerItemProps> = ({  label, navigateTo }) => {
    const navigation = useNavigation<DrawerNavigationProp>();
  return (
    <DrawerItem
      label={label}
      onPress={() => navigation.navigate(navigateTo)}
    />
  );
};

const DrawerItems: React.FC = () => {
  return (
    <>
      {DrawerList.map((item, index) => (
        <DrawerLayout
          key={index}
          label={item.label}
          navigateTo={item.navigateTo}
        />
      ))}
    </>
  );
};
export function MyDrawerItems(): React.JSX.Element {
    return(
    <View><DrawerItems/></View>
    )
}
export default DrawerItems;
