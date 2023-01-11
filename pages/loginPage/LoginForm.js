import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { styles } from "../styles";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { authenticate } from "../../Firebase/Authentication";
import user from "../../Firebase/User";
import { postMessage } from "../../Firebase/Utils";
import {
  isFirstEntry,
  updateFirstEntry,
} from "../../Firebase/BarberOperations";
import { useFocusEffect } from "@react-navigation/native";


export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          await authenticate(email, password);
          if (user.setCustomer()) {
            navigation.navigate("CustomerMenu");
          } else {
            console.log('user id singleton = ', user.userID());
            if (await isFirstEntry(user.userID())) {
              await updateFirstEntry(user.userID());
              navigation.navigate("WorkingDays");
            } else {
              navigation.navigate("MenuBarber");
            }
          }
        }}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={styles.loginText}>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}
