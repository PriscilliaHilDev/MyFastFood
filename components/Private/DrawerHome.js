
import React from 'react'
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Products from "../Products";

const Drawer = createDrawerNavigator();

const DrawerHome = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Products" component={Products} />
    </Drawer.Navigator>
  );
}
export default DrawerHome;