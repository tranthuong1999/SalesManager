import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View , StyleSheet, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import   firebase   from '../firebase/Config';
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({navigation}) {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const onPayBill = async() =>{
        if (name === "") {
            alert("please enter name");
          }
          else if( address === ''){
            alert("please enter address");
          } 
          else if (phone === ''){
            alert("please enter phone ");
          }
          else {
      
            try {
              await firebase.db.collection("pay").add({
                name: name,
                address: address,
                phone: phone,
              });
              alert("Thanh toan thanh cong ");
              setName('');
              setAddress('');
              setPhone('');
              this.props.navigation.navigate("Categories");
            } catch (error) {
              console.log(error)
            }
          }
    }

    return (
        <View style={styles.container}>
          <Ionicons
            style={{ marginTop: 40, marginLeft: -288, paddingBottom: 20 }}
            name="arrow-back-circle"
            size={30}
            type="back"
            color="black"
            onPress={() => navigation.goBack()}
          />
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    // secureTextEntry
                    placeholder='Address'
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    // secureTextEntry
                    placeholder='Phone'
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onPayBill()}>
                    <Text style={styles.buttonTitle}> Pay </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
},
title: {

},
logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30
},
input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
},
button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
},
buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
},
footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
},
footerText: {
    fontSize: 16,
    color: '#2e2e2d'
},
footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
}
});