import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import axios from "axios";
import Category from "./screens/Category";
import Categories from "./screens/Categories";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrderScreen from "./screens/Order";
import LoginScreen from "./screens/Login";
import CartScreen from "./screens/Cart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TabView, SceneMap } from "react-native-tab-view";

import Register from "./screens/Register"
import Bottom from './screens/TabView'

axios.defaults.baseURL = "http://localhost:3000";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App({ route }) {
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabView">
      <Stack.Screen name="TabView" options={{headerShown: false}} component={Bottom} />
      <Stack.Screen name="Category" options={{headerShown: false}} component={Category} />
      <Stack.Screen name="Register" options={{headerShown: false}} component={Register} />
      <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />      
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