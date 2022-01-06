import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions , TextInput } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { ScrollView } from "react-native-gesture-handler";
import { or } from "react-native-reanimated";
import OrderListItem from "../components/OrderListItem";
import firebaseConfig from "../firebase/Config";

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      orderFilter: [],
      text:null
    };
  }

  componentDidMount() {
    this.getDataProduct();
  }

  getDataProduct() {
    console.log("get data products ");
    firebaseConfig.db.collection("products").onSnapshot((querySnapshot) => {
      const order = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, images, salePrices, qty, checked , color} = doc.data();
        order.push({
          id: doc.id,
          name,
          images,
          salePrices,
          qty,
          checked,
          color
        });
      });
      this.setState({
        order: order,
        orderFilter: order,
      });
    });
  }
  async onAddToCard(product ){
    console.log("add to cart")
    console.log("Product " , product)
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
      console.log("Cart" , cart)

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
  handleSearch(text){
    const textData = text.charAt(0).toUpperCase() + text.slice(1);
    // const textData = text.charAt(0).toUpperCase() ;

    const nameFilter = this.state.order.filter( e => e.name == textData )

    console.log("Name Filter :" , nameFilter)

    if(text.trim() == 0){
      this.setState({
        orderFilter: this.state.order
      })
    }
    else{
      this.setState({
        orderFilter:nameFilter
      })
    }
  }

  render() {
    const { order, orderFilter , text } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView>
        <TextInput
          style={styles.input}
          onChangeText={ (text) => this.handleSearch(text)}
          value={text}
          placeholder="Tìm kiếm sản phẩm"
        />
        <FlatList
          data={ order }
          data={ (orderFilter === undefined) ? order : orderFilter }
          numColumns={2}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <View style={styles.wrapper}>
              <OrderListItem
                product={item}
                onAddToCardClick={ (product ) => 
                  this.onAddToCard(product)
                } 
              />
            </View>
          )}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={styles.container}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop:60
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
