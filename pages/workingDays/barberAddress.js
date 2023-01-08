import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, TextInput,StatusBar } from "react-native";
import { styles } from "../styles";
import { updateBarberAddress } from "../../Firebase/BarberOperations";
import {isFirstEntry,updateFirstEntry,} from "../../Firebase/BarberOperations";

export default function BarberAddress({ navigation }) {
    const [address, setaddress] = useState("");
    const [info, setInfo] = useState("");


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
          placeholder="Please Add Your Address Here"
          placeholderTextColor="#003f5c"
          onChangeText={(address) => setaddress(address)}
        />
      </View>
      <View style={styles.inputViewInfo}>
        <TextInput
          multiline={true}
          style={styles.TextInput}
          placeholder="Please Add Your Info Here"
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
            navigation.navigate("CalendarPageBarber");
          }
          
        }}
      >
        <Text style={styles.loginText}>Confirm Address And Login</Text>
      </TouchableOpacity>
    </View>
    );
}


