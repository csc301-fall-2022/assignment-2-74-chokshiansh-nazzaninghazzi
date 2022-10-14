import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { CartItems } from "../Context";
import {firebase} from '../firebase'
import AppleComponent from "../components/AppleComponent";

let main_total_quantity = 0;
const MainScreen = () => {
    const [products, setProducts] = useState([]);
    const prodRef = firebase.firestore().collection('products');
    useEffect( () =>{
      async function fetchData(){

        prodRef.onSnapshot(
          querySnapshot => {
              const products = []
              querySnapshot.forEach((doc) =>{
                  const {id, info, name, photo, price} = doc.data()
                  products.push({
                      id,
                      info,
                      name,
                      photo,
                      price,
                      quantity: 1,
                      size: '256gb'
                      
                  })
    
              })
              setProducts(products)
    
              
          }
      )}
      fetchData();
    }, [] );
  const navigation = useNavigation();
  const { cart, setCart } = useContext(CartItems);
  const total_quantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  main_total_quantity = total_quantity
  
  const total = cart
    .map((item) => Number(item.price * item.quantity))

    .reduce((prev, curr) => prev + curr, 0);
  console.log(cart, "cart items added");
  console.log(total, "total price");
  return (
    <SafeAreaView>
      <FlatList
        style={{top: "6%"}}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({key, item }) => <AppleComponent apple={item} />}
      />
      {total === 0 ? null : (
        <Pressable
        onPress={() => navigation.navigate("Cart", {removeSelected: false, removedItem: null})}
          style={{
            
            backgroundColor: "green",
            padding: 10,
            position: "absolute",
            bottom: "96%",
            left: "67%",
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
              
            }}
          >
            ({total_quantity}) Go to Cart
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
export {main_total_quantity}
const styles = StyleSheet.create({});

