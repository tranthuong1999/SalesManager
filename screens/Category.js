import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import ProductListItem from "../components/ProductListItem";
import { Ionicons } from "@expo/vector-icons";
import  firebaseConfig from "../firebase/Config";

const windowWidth = Dimensions.get("window").width;

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    // products:[],
    cart:[]
  }
  }

  componentDidMount() {
    this.getDataProduct();
  }

  getDataProduct() {
      firebaseConfig.db.collection('products').where('categoriesID','==' , this.props.route.params.id).onSnapshot((querySnapshot) => {
        const product = [];
        querySnapshot.docs.forEach((doc) => {
          const { name , color , checked , salePrices , qty , images , categoriesID } = doc.data();
          // console.log("id categories :" , doc.data())
          product.push({
            id: doc.id,
            name,
            color,
            checked,
            salePrices,
            qty,
            images,
            categoriesID
          });
        });
        this.setState({
          product:product
        })
      });
  }

  async onAddToCard(product ){

       firebaseConfig.db.collection('cart').onSnapshot((querySnapshot) => {
        const cart = [];
        querySnapshot.docs.forEach((doc) => {
          const { name , color , checked , salePrices , qty , images   } = doc.data();
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
        console.log("Itemcart ", itemCart)
        console.log("Product" , product)
  
        if( itemCart){
          console.log(" 11111")
          alert("Bạn đã thêm rồi");
        }else
        {
          console.log("2222")
          
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

  async onAddToCard(product ){
         
     firebaseConfig.db.collection('cart').onSnapshot((querySnapshot) => {
      const cart = [];
      querySnapshot.docs.forEach((doc) => {
        const { name , color , checked , salePrices , qty , images   } = doc.data();
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
      console.log("Cart" ,typeof cart)

      const itemCart = cart.find( e => e.name == product.name)
      console.log("Itemcart ", itemCart)
      console.log("Product" , product)

      if( itemCart){
        console.log(" 11111")
        alert("Bạn đã thêm rồi");
      }else
      {
        console.log("2222")
        
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
    console.log("name " , route.params.name )

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
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginTop: 40,
              backgroundColor:'Red',
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
