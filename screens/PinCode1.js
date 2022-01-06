
import Icon from "react-native-vector-icons/Ionicons"
import React, { Component } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text , Dimensions } from "react-native"
import ReactNativePinView from "react-native-pin-view"
import PinCode from "./PinCode"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
    return (
    <>
        <SafeAreaView style={{ width : windowWidth , height : windowHeight}}>
          <PinCode  navigation = {this.props.navigation}/>      
        </SafeAreaView>
    </>
     
    );
  }
}
// barStyle="light-content"

