import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
  DevSettings

} from "react-native";
import React, {useContext} from "react";
import { useNavigation } from "@react-navigation/native";
import { CartItems } from "../Context";
import MainScreen, {main_total_quantity} from "./MainScreen"
import { cart_percentage, cart_shipping, cart_total, cart_tax, cart_temp} from "./CartScreen";


const OrderData = () => {
  const { cart, setCart } = useContext(CartItems);
  const navigation = useNavigation();
  const tax_amount = Number((cart_total + cart_shipping)*(cart_tax/100));
  console.log(tax_amount)
  const reset= () => {
    
    navigation.navigate('Main');
    setCart([])
    
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Text style={{top: "5%", left: "5%", fontWeight:"bold", fontSize:"18px"}}>Order Summary:</Text>
      
      <View style={{top:"7%", borderBottomColor:"black", borderBottomWidth: "1px"}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{height: "50%"}}>
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
          <Text> </Text>
          </ScrollView>
        
      </View>

      <View style={{top: "10%", left: "5%", borderBottomWidth:"1px", borderBottomColor:"grey"}}>
        <Text>
          Items({main_total_quantity}): ${cart_total}
        </Text>
        <Text>
          Shipping: ${cart_shipping}
        </Text>
        {cart_percentage == undefined ? (
          <View>
           
          <Text>
          Total before Tax: ${cart_total + cart_shipping}
        </Text>
        <Text>
          Estimated Tax: ${tax_amount.toFixed(2)}
        </Text>
        <Text>
           Order Discount: -${0}
         </Text>
        </View>
        
        ):(
          <View>
              
          <Text>
          Total before Tax: ${cart_total + cart_shipping}
        </Text>
        <Text>
          Estimated Tax: ${tax_amount.toFixed(2)} ({cart_tax}%)
        </Text>
        <Text>
          Order Discount: -${((cart_total + cart_shipping + tax_amount ) - cart_temp).toFixed(2)} ({cart_percentage}%)
        </Text>
        </View>
        )}
          
        <Text> </Text>
      </View>

      <View style={{top: "13%", left: "5%"}}>
        <Text>
          Order Total: ${cart_temp}
        </Text>
      </View>
      <View style={{top: "16%", align:"center"}}>
        <Text style={{ fontWeight:"bold", fontSize:"18px", textAlign:"center"}}>
          Thank you for shopping with us!
        </Text>
      </View>
      
      <Pressable onPress={() => reset()}
          style={{
            
            backgroundColor: "green",
            padding: 10,
            position: "absolute",
            bottom: "9%",
            left: 127,
            borderRadius: 6,
          }}>
            <Text>
              Start a new order
            </Text>
        
      </Pressable>
    </SafeAreaView>
  );
};

export default OrderData;

const styles = StyleSheet.create({});
