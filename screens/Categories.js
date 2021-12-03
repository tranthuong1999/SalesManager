import React, { Component } from "react";
import { StyleSheet , Text , View, FlatList, Dimensions} from "react-native";
import axios from "axios";
import CategoryListItem from "../components/CategoryListItem";

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          id: 1,
          name: "Dụng cụ trượt tuyết",
        },
        {
          id: 1,
          name: "Quần áo trượt tuyết",
        },
        {
          id: 3,
          name: "Kính mũ",
        },
      ],
      index: 0,
      routes: [
        { key: "first", title: "Cart" },
        { key: "second", title: "Order" },
      ],
    };
  }
  // componentDidMount(){
  //   axios.get('/categories')
  //   .then( res =>{
  //     this.setState({
  //       categories: res.data
  //     })
  //   })
  //   .catch( err =>{
  //     console.log("error :" ,err)
  //   })
  // }
  render() {
    const { categories } = this.state;
    const { navigation } = this.props;
    return (
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryListItem
              category={item}
              onPress={() =>
                navigation.navigate("Category", {
                  name: item.name,
                })
              }
            />
          )}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={styles.container}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});


