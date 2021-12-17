import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Alert,
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
    console.log('Clicked mua')
      firebaseConfig.db.collection('products').onSnapshot((querySnapshot) => {
        const product = [];
        querySnapshot.docs.forEach((doc) => {
          const { name , color , checked , salePrices , qty , images , categoriesID  } = doc.data();
          
          console.log("id categories :" , categoriesID)
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
        console.log("Product" , product)
      });

  }

  async onAddToCard(product ){
    
    const productLocal = await AsyncStorage?.getItem('product') 

    if( productLocal == null){
      var list = []
      list.push(product)
     AsyncStorage.setItem('product', JSON.stringify(list))  
     alert("Them thanh cong san pham " )

    }else {
      const productLocalArr =  JSON.parse(productLocal)
      const check = productLocalArr.find( e => e.id == product.id )
      //  console.log("Check :" ,check)
       if(check == undefined){
        productLocalArr.push(product)
        AsyncStorage.setItem('product', JSON.stringify(productLocalArr))
       alert("Them thanh cong san pham " )
       }else{
         alert("Ban da them roi ")
       }
    }
   }
   
  render() {
    const { route, navigation } = this.props;

    return (
      <View>
        <View style={{ flex: 1, flexDirection: "row" }}>          
          <Ionicons
            style={{ marginTop: 50, marginLeft: 40, paddingBottom: 20 }}
            name="arrow-back-circle"
            size={30}
            type="back"
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              marginTop: 5,
              marginBottom: 20,
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
});
