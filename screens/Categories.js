import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import CategoryListItem from "../components/CategoryListItem";
import  firebase  from "../firebase/Config";


export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getDataCategories();
  }

  getDataCategories() {
    console.log("get data categories " )
      firebase.db.collection("categories").onSnapshot((querySnapshot) => {
        const categories = [];
        querySnapshot.docs.forEach((doc) => {
          const { name , images  } = doc.data();
          console.log("Name  ",doc.id)
          categories.push({
            id: doc.id,
            name,
            images
          });
        });
        this.setState({
          categories:categories
        })
      });
  }

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
                id:item.id
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
