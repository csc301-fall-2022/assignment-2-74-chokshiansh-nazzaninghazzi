import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import {firebase} from '../firebase'
import { CartItems } from "../Context";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import ModalDropdown from "react-native-modal-dropdown";

let cart_percentage, cart_shipping, cart_total, cart_tax, cart_temp;
const CartScreen = () => {
  
  const [tax, setTax] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const [discount, setDiscount] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [province, setProvince] = useState([]);
  const provRef = firebase.firestore().collection('province');
  const DisRef = firebase.firestore().collection('discount');
  const [options, setOptions] = useState([])
  const [dcodes, setDcodes] = useState([])
  useEffect(() =>{
    async function fetchData() {
      provRef.onSnapshot(
        querySnapshot => {
            const province = []
            const options = []
            querySnapshot.forEach((doc) =>{
                const {name, shipping, tax} = doc.data() 
                province.push({
                    name, 
                    shipping,
                    tax
                })
                options.push(
                  name
                )
  
            })
            setProvince(province)
            setOptions(options)
            
        },
      DisRef.onSnapshot(
        querySnapshot => {
          const discount = []
           const dcodes = []
            querySnapshot.forEach((doc) => {
              const {name, percentage} = doc.data()
              discount.push({
                name,
                percentage
              })
              dcodes.push(
                name
              )
            })
          setDiscount(discount)
          setDcodes(dcodes)
        }
      )
    )
      }
    fetchData();
  }, [] );




  console.log(options);
  const navigation = useNavigation();
  const { cart, setCart } = useContext(CartItems);
  const total = cart
    .map((item) => Number((item.price * item.quantity)))
    .reduce((prev, curr) => prev + curr, 0);
  cart_total = total
  
  const addTax = (name) => {
    province.map((item) => {
      if (name === item.name) {
        setTax(item.tax)
        cart_tax = item.tax
        setShipping(item.shipping)
        cart_shipping = item.shipping
      }
    }
    )
  }  

  const addDiscount = (name) => {
    discount.map((item) => {
      console.log(item)
      console.log(item.name)
      console.log(item.name == name)
      console.log(item.percentage)
      if (name === item.name) {
        setPercentage(item.percentage)
        cart_percentage = item.percentage
      }
    }
    )
  } 
  const calculateTotal = () => {
    const temp = ((((total+shipping) * (tax/100)) + (total+shipping))* ((100-percentage)/100 ))
    cart_temp = temp
    return(
      temp
    )
  }
  const placeOrder = () => {
    navigation.navigate("Order")

    //setCart([])
  }

  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {cart.map((item, key) => (
            <Pressable
              style={{
                backgroundColor: "#006491",
                padding: 10,
                margin: 10,
                borderRadius: 8,
              }}
              key={key}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 70, height: 70, borderRadius: 6 }}
                  source={{ uri: item.photo }}
                />

                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {item.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 6,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 17 }}>
                      {item.size}
                    </Text>
                    <Text style={{ color: "white", fontSize: 15 }}>
                      {" "}
                      | {item.info.substr(0, 25) + "..."}
                    </Text>
                  </View>

                  <Text style={{ color: "white", fontSize: 16 }}>
                    ${item.price * item.quantity}
                  </Text>
                </View>
              </View>
            </Pressable>
            
          ))}
          </ScrollView>
      </View>
          <View style={{borderBottomColor :"black", borderBottomWidth :"1px"}}>
            <Text style={{ sizefontWeight: "bold", fontSize: 17}}>
                Select province:
            </Text>
            <Text> </Text>
            
            <ModalDropdown
                  dropdownStyle={{ width: 400, height: 300 }}
                  style={{ width: 500 }}
                  defaultValue={"None⌄"}
                  options={options}
                  onSelect={(e) => addTax(String(options[e]))}>
                  
              </ModalDropdown>
              
              <Text>   </Text>
              <Text style={{ sizefontWeight: "bold", fontSize: 17}}>
                Select Discount:
            </Text>
            <Text> </Text>
              
                <ModalDropdown
                  dropdownStyle={{ width: 400, height: 300 }}
                  style={{ width: 500 }}
                  defaultValue={"None⌄"}
                  options={dcodes}
                  onSelect={(f) => addDiscount(String(dcodes[f]))}
                ></ModalDropdown>
                <Text> </Text>
              </View>  
      

      {total === 0 ? (
         <Pressable
         style={{
           marginBottom: "auto",
           marginTop: "auto",
           alignItems: "center",
           justifyContent: "center",
           height: "100%",
         }}
       >
         <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
           Cart is empty!
         </Text>
         <Image
           style={{
             width: 250,
             height: 600,
             resizeMode: "contain",
           }}
           source={{
             uri: "https://pizzaonline.dominos.co.in/static/assets/empty_cart@2x.png",
           }}
         />
       </Pressable>
      ) : (
        <View style={{ height: 200 }}>
        <View
          style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
        >
        </View>

        <View
          style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome5 name="amazon-pay" size={24} color="black" />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{'Cart Value: $'+total}</Text>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{'Provincial Tax: '+tax}%</Text>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{'Shipping cost: $'+shipping}</Text>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{'Discount: '+percentage}%</Text>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{'Total : $' + calculateTotal()}</Text>
          </View>
        </View>
        <Pressable
        onPress={placeOrder}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "green",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Place Order
          </Text>
        </Pressable>
      </View>
      )}  
     
    </>
  );
};

export default CartScreen;
export {cart_percentage, cart_shipping, cart_total, cart_tax, cart_temp}
const styles = StyleSheet.create({});
