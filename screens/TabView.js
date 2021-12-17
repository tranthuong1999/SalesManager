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
import SettingScreen from "./Setting";

import  firebaseConfig from "../firebase/Config";



import { Ionicons } from "@expo/vector-icons";

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const windowWidth = Dimensions.get("window").width;

export default class Bottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Home" },
        { key: "second", title: "Cart" },
        { key: "three", title: "Orders" },
        { key: "four", title: "Setting" },
      ],
      loading : true ,
      user : null 
    };
  }
   componentDidMount(){
    const usersRef = firebaseConfig.firebase.firestore().collection('users');
     firebaseConfig.firebase.auth().onAuthStateChanged(user => {
        if (user) {
          usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
              const userData = document.data()
              this.setState({
                loading:false
              })
              this.setState({
                user:userData
              })
            })
            .catch((error) => {
              this.setState({
                loading:false
              })
            });
        } else {
          this.setState({
            loading:false
          })
        }
      });
   }

  renderScene = ({ route  }) => {
    
    switch (route.key) {
      case "first":
        return <CategoriesScreen navigation={this.props.navigation} />;
      case "second":
        return <CartScreen navigation={this.props.navigation} />;
      case "three":
        return <OrderScreen  navigation={this.props.navigation}/>;
      case "four":
        return <SettingScreen  navigation={this.props.navigation}/>;
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

