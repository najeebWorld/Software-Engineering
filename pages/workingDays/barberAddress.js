import React, { useState } from "react";
import user from "../../Firebase/User";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, TouchableOpacity, Image, TextInput,StatusBar } from "react-native";
import { styles } from "../styles";
import { getBarber, updateBarberAddress } from "../../Firebase/BarberOperations";
import {isFirstEntry,updateFirstEntry,} from "../../Firebase/BarberOperations";

export default function BarberAddress({ navigation }) {
    const [address, setaddress] = useState("");
    const [info, setInfo] = useState("");
    const [addressMessage,setAddressMessage] = useState("Please Add Address Here");
    const [infoMessage,setInfoMessage] = useState("Please Add Info Here");


    useFocusEffect(
      React.useCallback(() => {
        const get_Barber = async () => {
          const res = await getBarber(user.userID());

          if(res.BarberAddress == undefined){
            console.log("No Address is setup for this user.");
          }else{
            console.log("User Address: ", res.BarberAddress);
            setaddress(res.BarberAddress);
            setAddressMessage(res.BarberAddress);
          }
          if(res.BarberInfo == undefined){
            console.log("No Info is setup for this user.");
          }else{
            console.log("User Info: ", res.BarberInfo);
            setInfo(res.BarberInfo);
            setInfoMessage(res.BarberInfo);
          }
        };
        get_Barber().catch((err) => alert(err));
      }, [])
    );


    

    return (
        <View style={styles.container}>
      <Image
        source={require("../assets/logowithname.png")}
        style={styles.logoContainer}
      />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder= {addressMessage}
          placeholderTextColor="#003f5c"
          onChangeText={(address) => setaddress(address)}
        />
      </View>
      <View style={styles.inputViewInfo}>
        <TextInput
          multiline={true}
          style={styles.TextInput}
          placeholder={infoMessage}
          placeholderTextColor="#003f5c"
          onChangeText={(info) => setInfo(info)}
        />
      </View>

      
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          if (info == "" ){
            alert("Bad info data, Try again");
          }
          else if (address == "" ){
            alert("Bad address data, Try again");
          }
          else{
            console.log("Updating user ",", to address: " ,address);
            updateBarberAddress(address,info);
            navigation.navigate("MenuBarber");
          }
          
        }}
      >
        <Text style={styles.loginText}>Confirm Address And Login</Text>
      </TouchableOpacity>
    </View>
    );
}


