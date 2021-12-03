import React, { Component } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CategoriesScreen from "./Categories";
import OrderScreen from "./Order";
import CartScreen from "./Cart";
import LoginScreen from "./Login";


import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const color ={
  ACTIVE:'#147efb',
  INACTIVE:'#ccc'
}

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Home" },
        { key: "second", title: "Cart" },
        { key: "three", title: "Orders" },
        { key: "four", title: "Login" },
      ],
    };
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <CategoriesScreen navigation={this.props.navigation} />;
      case "second":
        return <CartScreen />;
      case "three":
        return <OrderScreen />;
      case "four":
        return <LoginScreen  navigation={this.props.navigation}/>;
      default:
        return null;
    }
  };

  renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "red" }}
      style={{ backgroundColor: "pink" }}
      renderIcon={({ route, focused, color }) => {
        if (route.key === "first") {
          return <Ionicons name="ios-planet" size={23} color="black" />;
        }
        if (route.key == "second") {
          return <Ionicons name="ios-cart" size={23} color="black" />;
        }
        if (route.key == "three") {
          return <Ionicons name="book-sharp" size={23} color="black" />;
        }
        if (route.key == "four") {
          return <Ionicons name="settings" size={23} color="black" />;
        }
        // if( route.key == 'null'){
        // return <Ionicons color={ focused ? color.ACTIVE : color.INACTIVE}  />
        // }
      }}
    />
  );

  render() {
    const { index, routes } = this.state;

    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={this.renderScene}
        onIndexChange={(index) =>
          this.setState({
            index,
          })
        }
        initialLayout={{ width: windowWidth }}
        tabBarPosition={"bottom"}
        renderTabBar={this.renderTabBar}
      />
    );
  }
}

