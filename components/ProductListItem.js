import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { formatPrice } from "../utils/Number";

export default class ProductListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

   render() {
    const { product , onAddToCardClick } = this.props;
    return (
      <View style={styles.shadow}>
        <View style={styles.container}>
          <Image style={styles.img} source={{uri: product.images}} />
          <View style={styles.info}>
            <Text style={styles.name}>{product.name}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>
                {" "}
                {formatPrice(product.salePrices)}{" "}
              </Text>
              <TouchableOpacity onPress={() => onAddToCardClick(product) } >
                <Text style={styles.cartText} >MUA </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cartText: {
    textTransform: "uppercase",
    fontSize: 16,
    color: "#2f95dc",
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  container: {
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  info: {
    padding: 8,
  },
  img: {
    height: 150,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  name: {
    fontSize: 16,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    flex: 1,
    color: "#888",
    fontSize: 16,
  },
});
