import  React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './Login';
import Register from './Register'



function LogOut({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Login')}
        title="Go to login"
      />
    </View>
  );
}
const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginScreen}  />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="Logout" component={LogOut} />
      </Drawer.Navigator>
  );
}