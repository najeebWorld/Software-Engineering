import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { CheckBox } from 'react-native-elements'
import { styles } from '../styles'
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from "react-native";


export default function SuccessfullLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
      <Image
        source={require('../assets/welcome.png')}
        style={styles.logoContainerSuccess}
      />
      <Image
        source={require('../assets/logo.png')}
        style={styles.logoContainerSuccess}
      />
      </View>
      <StatusBar style="auto" />
   
      <TouchableOpacity style={styles.loginBtn} onPress={() => {
        console.log(email, password);
        navigation.navigate('Login')
      }}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

