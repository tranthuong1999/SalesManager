import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Category from "./screens/Category";
import Categories from "./screens/Categories";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrderScreen from "./screens/Order";
import LoginScreen from "./screens/Login";
import PayBillScreen from "./screens/PayBill";
import CartScreen from "./screens/Cart";
import Register from "./screens/Register"
import Bottom from './screens/TabView'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from "./screens/Setting";
import TestLogin from "./screens/TestLogin";



const Stack = createNativeStackNavigator();
export default function App({ route }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabView">
      {/* <Stack.Screen name="TestLogin" options={{headerShown: false}} component={TestLogin} /> */}
      <Stack.Screen name="TabView" options={{headerShown: false}} component={Bottom} />
      <Stack.Screen name="Category" options={{headerShown: false}} component={Category} />
      <Stack.Screen name="Register" options={{headerShown: false}} component={Register} />
      <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />  
      <Stack.Screen name="PayBill" options={{headerShown: false}} component={PayBillScreen} />   
      <Stack.Screen name="Categories" options={{headerShown: false}} component={Categories} />      

    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
