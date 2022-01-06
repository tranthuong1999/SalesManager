import React, { Component } from "react";
import {  Button } from "react-native";
import  firebaseConfig  from "../firebase/Config";


export default class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  signOutUser = async () => {
    try {
        await firebaseConfig.firebase.auth().signOut();
        this.props.navigation.navigate('Login');
    } catch (e) {
        console.log(e);
    }
}

  render() {
    return (
        <Button  title="LogOut" onPress={() => this.signOutUser()} />
    );
  }
}

