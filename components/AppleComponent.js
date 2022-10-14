import { StyleSheet, Text, View, Pressable, Image} from "react-native";
import React, { useContext, useState } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import { CartItems } from "../Context";
import Toast from "react-native-root-toast";

const AppleComponent = ({ apple}) => {
  const data = [apple];
  // console.log("data",data);
  //const options = ["256GB", "512GB", "1080GB"];
  //console.log(select)
  const { cart, setCart } = useContext(CartItems);
  const [selected, setSelected] = useState(false);
  console.log(selected)
  
  const [additems, setAddItems] = useState(0);
  
  
  const addToCart = () => {
    
    setSelected(true);
    

    if (additems === 0) {
      setAddItems(1);
    }

    const ItemPresent = cart.find((item) => item.id === apple.id);
    if (ItemPresent) {
      setCart(
        cart.map((x) =>
          x.id === apple.id
            ? { ...ItemPresent, quantity: ItemPresent.quantity + 1 }
            : x
        )
      );
    } else {
      setCart([...cart, { ...apple,quantity: 1 }]);
      
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
    const ItemPresent = cart.find((item) => item.id === apple.id);
    if (additems === 1) {
      setSelected(false)

      setCart(cart.filter((x) => x.id !== apple.id));
    } else {
      setCart(
        cart.map((x) =>
          x.id === apple.id
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
  };
  
  return (
    <View>
      {data.map((item, index) => (
        <View key={item.name}>
        <Pressable style={{ backgroundColor: "#006491",
         borderEndColor: "#AFD8F5", borderWidth: 0.1,
        flexDirection: 'row', flexWrap: 'wrap', borderBottomColor :"DAD8D8",
        borderBottomWidth :"1px" }}>
          <Image
            style={{ height: 150, aspectRatio: 1 / 1, resizeMode: "cover", width:'40%' }}
            source={{ uri: item.photo }}
          />
          
          <View style={{ backgroundColor: "#006491", padding: 10, width:'60%'}}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              {item.name}
            </Text>
            
            <Text style={{ fontSize: 15, color: "white" }}>
              ${item.price}
            </Text>

            <Text style={{ color: "pink", marginTop: 4 }}>
              {item.info}
            </Text>
            
            <Pressable
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              
              
              {selected ? (
                <Pressable
                  style={{
                    backgroundColor: "#03C03C",
                    padding: 2,
                    marginLeft: 15,
                    borderRadius: 4,

                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Pressable onPress={removeFromCart}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        paddingHorizontal: 10,

                        fontWeight: "600",
                      }}
                    >
                      -
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        paddingHorizontal: 5,
                        fontWeight: "600",
                      }}
                    >
                      {additems}
                    </Text>
                  </Pressable>

                  <Pressable onPress={addToCart}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        paddingHorizontal: 10,
                        fontWeight: "600",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Pressable>
              ) : (
                <Pressable
                  onPress={addToCart}
                  style={{
                    backgroundColor: "#03C03C",
                    padding: 5,
                    marginLeft: 15,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Add To Cart
                  </Text>
                </Pressable>
              )}
            </Pressable>
          </View>
        </Pressable>
        
        </View>
        
      ))}
    </View>
  );
};

export default AppleComponent;

const styles = StyleSheet.create({});