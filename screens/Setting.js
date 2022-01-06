import  React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import  firebaseConfig  from "../firebase/Config";

import LogOut from './LogOut';
import PinCode from './PinCode';




const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Logout"  component={LogOut} />
        {/* <Drawer.Screen name="PinCode"  component={PinCode} /> */}

      </Drawer.Navigator>
  );
}