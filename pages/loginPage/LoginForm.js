import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { styles } from "../styles";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { authenticate, signOut } from "../../Firebase/Authentication";
import user from "../../Firebase/User";
import {
  isFirstEntry,
  updateFirstEntry,
} from "../../Firebase/BarberOperations";
import { useFocusEffect } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      const checkSignOut = async () => {
        await signOut();
      };
      checkSignOut().catch((err) => console.log(err));
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
          console.log("auth");
          if (user.setCustomer()) {
            navigation.navigate("MyAppointments");
          } else {
            console.log("barber");
            if (await isFirstEntry(user.userID())) {
              console.log("enter");
              await updateFirstEntry(user.userID());
              console.log("update");
              navigation.navigate("WorkingDays");
            } else {
              console.log("not first");
              navigation.navigate("CalendarPageBarber");
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
