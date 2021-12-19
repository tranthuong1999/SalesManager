import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import ProductListItem from "../components/ProductListItem";
import { Ionicons } from "@expo/vector-icons";
import  firebaseConfig from "../firebase/Config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get("window").width;

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    products:[],
    cart:[]
  }
  }

  componentDidMount() {
    this.getDataProduct();
  }

  getDataProduct() {
    // console.log('Clicked mua')
      firebaseConfig.db.collection('products').onSnapshot((querySnapshot) => {
        const product = [];
        querySnapshot.docs.forEach((doc) => {
          const { name , color , checked , salePrices , qty , images   } = doc.data();
          // console.log("id categories :" , categoriesID)
          product.push({
            id: doc.id,
            name,
            color,
            checked,
            salePrices,
            qty,
            images,
          });
        });
        this.setState({
          product:product
        })
        // console.log("Product" , product)
      });

  }

  async onAddToCard(product ){

    firebaseConfig.db.collection('cart').onSnapshot((querySnapshot) => {
      const cart = [];
      querySnapshot.docs.forEach((doc) => {
        const { name , color , checked , salePrices , qty , images   } = doc.data();
        // console.log(" cart  :" , doc.data())
        cart.push({
          id: doc.id,
          name,
          color,
          checked,
          salePrices,
          qty,
          images,
        });
      });

      const itemCart = cart.find( e => e.name == product.name)
      if( itemCart){
        alert("Bạn đã thêm rồi")
        return;
      }
      else{
        firebaseConfig.db.collection("cart").add({
                name: product.name,
                color: product.color,
                checked: product.checked,
                salePrices:product.salePrices,
                qty:product.qty,
                images:product.images,
              });
              alert("Thêm sản phẩm thành công ")
      }
    });    
   }
   
  render() {
    const { route, navigation } = this.props;

    return (
      <View>
        <View style={{ flex: 1, flexDirection: "row" , marginLeft: 30 }}>          
        <Ionicons
            style={{ marginTop: 40, marginLeft: 20, paddingBottom: 40 }}
            name="arrow-back-circle"
            size={30}
            type="back"
            color="black"
            onPress={() => navigation.goBack()}
          />
          {/* <TouchableOpacity onPress={ () =>{
            Alert.alert('Clicked')
            navigation.navigate('Categories') 
          }}>
              <Image
          style={styles.tinyLogo}
          source={{uri: 'https://cdn0.iconfinder.com/data/icons/spotify-line-ui-kit/100/go-back-line-512.png'}}
        />
        </TouchableOpacity> */}
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginTop: 100,
              marginBottom: 100,
              marginLeft : 40,
              flex: 1,
            }}
          >
            {route.params.name}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={this.state.product}
            contentContainerStyle={styles.container}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.wrapper}>
                <ProductListItem 
                product={item} 
                onAddToCardClick={ (product ) => 
                this.onAddToCard(product)
                } 
                />
              </View>
            )}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 80,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 8,
  },
  tinyLogo: {
    width: 30,
    height: 30,
    marginTop:30,
    marginLeft:5
  }
});
