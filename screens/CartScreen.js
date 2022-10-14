import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Modal
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import {firebase} from '../firebase'
import { CartItems } from "../Context";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import ModalDropdown from "react-native-modal-dropdown";
import Toast from "react-native-root-toast";
let cart_percentage, cart_shipping, cart_total, cart_tax, cart_temp;

const CartScreen = () => {
  console.log(cart_percentage)
  const [tax, setTax] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const [discount, setDiscount] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState(true);
  const [province, setProvince] = useState([]);
  const provRef = firebase.firestore().collection('province');
  const DisRef = firebase.firestore().collection('discount');
  const [options, setOptions] = useState([])
  const [dcodes, setDcodes] = useState([])
  const [additems, setAddItems] = useState(1);
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
        cart_tax = item.tax
        setTax(item.tax)
        setShipping(item.shipping)
        cart_shipping = item.shipping
      }
    }
    )
  }

  const addDiscount = (name) => {
    discount.map((item) => {
      
      if (name === item.name) {
        setPercentage(item.percentage)
        cart_percentage = item.percentage
      }
    }
    )
  } 
  const calculateTotal = () => {
    const temp = ((((total+shipping) * (tax/100)) + (total+shipping))* ((100-percentage)/100 )).toFixed(2)
    cart_temp = temp
    return(
      
      temp
    )
  }
  const placeOrder = () => {
    navigation.navigate("Order")

    //setCart([])
  }
  const addToCart = () => {
   // setSelected(true);

    if (additems === 0) {
      setAddItems(1);
    }

    const ItemPresent = cart.find((item) => item.id === cart.id);
    if (ItemPresent) {
      setCart(
        cart.map((x) =>
          x.id === cart.id
            ? { ...ItemPresent, quantity: ItemPresent.quantity + 1 }
            : x
        )
      );
    } else {
      setCart([...cart, { ...cart,quantity: 1 }]);
    }
    let toast = Toast.show("Added to Cart", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
    setTimeout(function () {
      Toast.hide(toast);
    }, 2500);
    setAddItems(additems + 1);
  };

  const removeFromCart = () => {
    const ItemPresent = cart.find((item) => item.id === cart.id);
    if (additems === 1) {
     // setSelected(false);

      setCart(cart.filter((x) => x.id !== cart.id));
    } else {
      setCart(
        cart.map((x) =>
          x.id === cart.id
            ? { ...ItemPresent, quantity: ItemPresent.quantity - 1 }
            : x
        )
      );
    }
    setAddItems(Math.max(0, additems - 1));
    let toast = Toast.show("Removed from Cart", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
    setTimeout(function () {
      Toast.hide(toast);
    }, 2500);
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
                  </View>

                  <Text style={{ color: "white", fontSize: 16 }}>
                    ${item.price} x {item.quantity}
                  </Text>
                  
                </View>
              </View>
            </Pressable>
            
          ))}

          <View>
          <Modal animationType="slide"
        transparent={true}
        visible={show}
      >
      <View style={{backgroundColor: "#000000aa",flex:1}}>
        <View style={{backgroundColor: "#ffffff", marginTop: 75, padding: 40, borderRadius:10, }}>

        
        <Text style={{ fontWeight: "bold", fontSize: 40 }}>
          No Province Selected
          </Text>
          <Pressable
        onPress={() => setShow(false)}
        style={{
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        }}>
        <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Close
          </Text>
        </Pressable>
        </View>
        </View>
      </Modal>
      


         </View>
              
          
        </ScrollView>
       

       
      </View>
      
        
        <View
          style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
        >
          
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
                  onSelect={(e) => addTax(String(options[e]))}
                ></ModalDropdown>
              
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
              </View>
              
       <View style={{ height: 200 }}>
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
        
        {tax == 0 ?(

      <Pressable
        onPress={() => setShow(true)}
        style={{
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        }}

        >
  
       <Text
        style={{ textAlign: "center", color: "white", fontWeight: "200" }}
        >
          Place Order
      </Text>
      </Pressable>
      
        
        ):(
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


          
        )}
        
        
      </View>
      
      
     
    </>
  );
};

export default CartScreen;
export {cart_percentage, cart_shipping, cart_total, cart_tax, cart_temp}

const styles = StyleSheet.create({});
