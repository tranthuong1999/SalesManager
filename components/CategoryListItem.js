import React from 'react';
import { StyleSheet, Text, View , Image , TouchableOpacity, Alert } from 'react-native';
import SkiImage  from '../assets/ski.png';


export default function CategoryListItem ( props ) {
    const { category , onPress} = props 
    // console.log("Category :" , props.category )
     return(
         <TouchableOpacity 
         activeOpacity={0.5}
         onPress={onPress}
         > 
         <View style={styles.container}>
            <Text style={styles.title}> {category.name} </Text>
            <Image style={styles.categoryImages} source={{ uri : category.images}} />
        </View>
         </TouchableOpacity>
  
     );
}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        padding:16,
        borderRadius:4,
        backgroundColor:'#FFF',
        shadowColor:"#000",
        shadowOpacity:0.3,
        shadowRadius:10,
        shadowOffset:{ width:0 , height:0},
        marginBottom:16
    },
    categoryImages:{
        width:170,
        height:130
    },
    title:{
        textTransform:"uppercase",
        marginBottom:8,
        fontWeight:"700"
    }
})