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
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get("window").width;

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [
        {
        id: 1, 
        images:[
         {
           url:"http://sc04.alicdn.com/kf/H7c5285b2ac374441877387b528c524776.jpg "
         }
        ],
        name: " Mặt hàng 1",
        color: "Red", 
        qty: 1,
        salePrice: "105", 
        checked: 1
        },
        {
          id: 2, 
          images:[
           {
             url:"http://sc04.alicdn.com/kf/H7c5285b2ac374441877387b528c524776.jpg "
           }
          ],
          name: " Mặt hàng 2",
          color: "Red", 
          qty: 1,
          salePrice: "105", 
          checked: 1
          },
          {
            id: 3, 
            images:[
             {
               url:"http://sc04.alicdn.com/kf/H7c5285b2ac374441877387b528c524776.jpg "
             }
            ],
            name: "Mặt hàng 3",
            color: "Red", 
            qty: 1,
            salePrice: "105", 
            checked: 1
            },
            {
              id: 4, 
              images:[
               {
                 url:"http://sc04.alicdn.com/kf/H7c5285b2ac374441877387b528c524776.jpg "
               }
              ],
              name: "Mặt hàng 4",
              color: "Red", 
              qty: 1,
              salePrice: "105", 
              checked: 1
              },
              {
                id: 5, 
                images:[
                 {
                   url:"http://sc04.alicdn.com/kf/H7c5285b2ac374441877387b528c524776.jpg "
                 }
                ],
                name: " Mặt hàng 5",
                color: "Red", 
                qty: 1,
                salePrice: "105", 
                checked: 1
                },
                {
                  id: 6, 
                  images:[
                   {
                     url:"http://sc04.alicdn.com/kf/H7c5285b2ac374441877387b528c524776.jpg "
                   }
                  ],
                  name: " Mặt hàng 6",
                  color: "Red", 
                  qty: 1,
                  salePrice: "105", 
                  checked: 1
                  },
      ],
      
      index: 0,
      routes: [
        { key: "first", title: "First" },
        { key: "second", title: "Second" },
      ],
    };
  }
  // componentDidMount(){
  //   axios.get('/products')
  //   .then( res =>{
  //     this.setState({
  //       product: res.data
  //     })
  //   })
  //   .catch( err =>{
  //     console.log("error :" ,err)
  //   })
  // }


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
            size={25}
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
                onAddToCardClick={ (product  ) => 
                this.onAddToCard(product  )
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
