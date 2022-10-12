import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CartItems } from "../Context";
import {firebase} from '../firebase'
import AppleComponent from "../components/AppleComponent";


const MainScreen = () => {
    const [products, setProducts] = useState([]);
    const prodRef = firebase.firestore().collection('products');
    useEffect( async () =>{
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
      )
    }, [] )
  const navigation = useNavigation();
  const { cart, setCart } = useContext(CartItems);
  const total = cart
    .map((item) => Number(item.price * item.quantity))

    .reduce((prev, curr) => prev + curr, 0);
  console.log(cart, "cart items added");
  console.log(total, "total price");
  return (
    <SafeAreaView>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({ item }) => <AppleComponent apple={item} />}
      />
      {total === 0 ? null : (
        <Pressable
        onPress={() => navigation.navigate("Cart")}
          style={{
            backgroundColor: "green",
            padding: 10,
            position: "absolute",
            bottom: 100,
            left: 150,
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
            Go to Cart
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
