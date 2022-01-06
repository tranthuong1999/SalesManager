import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import {  SafeAreaView, StatusBar, Text , TouchableOpacity , View } from "react-native";
import ReactNativePinView from "react-native-pin-view";
import  firebaseConfig from "../firebase/Config";


const CreatePinCode = ({navigation}) => {
  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [showCompletedButton, setShowCompletedButton] = useState(false);
  useEffect(
    (props) => {
      if (enteredPin.length > 0) {
        setShowRemoveButton(true);
      } else {
        setShowRemoveButton(false);
      }
      if (enteredPin.length === 5) {
        setShowCompletedButton(true);
      } else {
        setShowCompletedButton(false);
      }

    },
    [enteredPin]
  );
  const createPinCode = (enteredPin) => {
    console.log('Enter Pin ' , enteredPin)

      if(enteredPin.length !='5'){
          alert(" Vui lòng nhập đủ 5 số ")
          return;
      }
     if( enteredPin.length == '5'){
        firebaseConfig.db.collection("code").add({
            code : enteredPin
          });
          alert('Tạo mật mã thành công ');
          navigation.navigate('PinCode1')
     }
  };
  const goBack =() =>{
      navigation.navigate("PinCode1")
}
 
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:"rgba(227,91,91,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            paddingTop: 24,
            paddingBottom: 48,
            color: "rgba(255,255,255,0.7)",
            fontSize: 48,
          }}
        >
          Tạo mật mã 
        </Text>
        <ReactNativePinView
          inputSize={32}
          ref={pinView}
          pinLength={5}
          buttonSize={60}
          onValueChange={(value) => setEnteredPin(value)}
          buttonAreaStyle={{
            marginTop: 24,
          }}
          inputAreaStyle={{
            marginBottom: 24,
          }}
          inputViewEmptyStyle={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#FFF",
          }}
          inputViewFilledStyle={{
            backgroundColor: "#FFF",
          }}
          buttonViewStyle={{
            borderWidth: 1,
            borderColor: "#FFF",
          }}
          buttonTextStyle={{
            color: "#FFF",
          }}
          onButtonPress={(key) => {
            if (key === "custom_left") {
              pinView.current.clear();
            }
            if (key === "custom_right") {
              alert("Entered Pin: " + enteredPin);
            }
          }}
          customLeftButton={
            showRemoveButton ? (
              <Icon name={"ios-backspace"} size={36} color={"#FFF"} />
            ) : undefined
          }
          customRightButton={
            showCompletedButton ? (
              <Icon name={"ios-unlock"} size={36} color={"#FFF"} />
            ) : undefined
          }
        />
        <View style={{ display:'flex' , flexDirection :'row' }}> 
        <TouchableOpacity 
        style={{  marginRight:10 , color:'red'  ,paddingVertical :15 , paddingHorizontal:20}} 
        onPress={() => createPinCode(enteredPin)}>
          <Text style={{ color:'red'}} >  Register Code </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ color:'red'  ,paddingVertical :15 , paddingHorizontal:20 }} 
         onPress={() => goBack()}>
          <Text >  Go back </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
export default CreatePinCode;
