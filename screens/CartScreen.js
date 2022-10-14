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
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute} from "@react-navigation/native";
import ModalDropdown from "react-native-modal-dropdown";
import Toast from "react-native-root-toast";
let cart_percentage, cart_shipping, cart_total, cart_tax, cart_temp;

const CartScreen = () => {
  // console.log(cart_percentage)
  const [tax, setTax] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [discount, setDiscount] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [show, setShow] = useState(false)
  const [province, setProvince] = useState([]);
  const provRef = firebase.firestore().collection('province');
  const DisRef = firebase.firestore().collection('discount');
  const [options, setOptions] = useState([])
  const [dcodes, setDcodes] = useState([])
  const navigation = useNavigation();
  const route = useRoute();
  const removeSelected = route.params.removeSelected
  const removedItem = route.params.removedItem
  
  
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

  const { cart, setCart } = useContext(CartItems);

  useEffect(() => {
    
    if(removeSelected === "true"){
      setCart(cart.filter((x) => x.id !== removedItem.id));
      let toast = Toast.show("Removed from Cart", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
      setTimeout(function () {
        Toast.hide(toast);
      }, 2500);
    
    }
    
  }, [])

  //console.log(options);
  
  
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
  

  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {cart.map((item, key) => (

              <View
                style={{
                  backgroundColor: "#006491",
                  padding: 10,
                  margin: 10,
                  borderRadius: 8,
                  flexDirection: 'row', flexWrap: 'wrap'
                }}
                key={key}
              >
                <View style={{ flexDirection: "row", alignItems: "center", width:"50%"}}>
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
                    </View>

                    <Text style={{ color: "white", fontSize: 16 }}>
                      ${item.price} x {item.quantity}
                    </Text>
                    
                  </View>
                </View>
                <Pressable  onPress={() => {navigation.replace("Cart", {removeSelected: "true", removedItem: item})}} style={{
                  backgroundColor: "#03C03C",
                  padding: 5,
                  marginLeft: "30%",
                  marginTop: "7%",
                  marginBottom:"5%",
                  borderRadius: 4,
                  
                }}> 
                <Text style={{ marginTop: "5%", color: "white", fontWeight: "bold", size:10 }}>
                  Remove
                </Text>
              </Pressable>
              </View>

            
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
            <Text style={{ sizefontWeight: "bold", fontSize: 17, left:"3%"}}>
                Select province:
            </Text>
            <Text> </Text>

            <ModalDropdown
                  dropdownStyle={{ width: 400, height: 300 }}
                  style={{ width: 500, left:"3%" }}
                  defaultValue={"None⌄"}
                  options={options}
                  onSelect={(e) => addTax(String(options[e]))}
                ></ModalDropdown>
              
              <Text>   </Text>
              <Text style={{ sizefontWeight: "bold", fontSize: 17, left:"3%"}}>
                Select Discount:
            </Text>
            <Text> </Text>

                <ModalDropdown
                  dropdownStyle={{ width: 400, height: 300 }}
                  style={{ width: 500, left:"3%" }}
                  defaultValue={"None⌄"}
                  options={dcodes}
                  onSelect={(f) => addDiscount(String(dcodes[f]))}
                ></ModalDropdown>
                <Text> </Text>
              </View>
              
       <View style={{ height: 200 }}>
        <View
          style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome5 name="cc-apple-pay" size={24} color="black" />
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