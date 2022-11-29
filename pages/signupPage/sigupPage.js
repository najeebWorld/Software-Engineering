import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { CheckBox } from 'react-native-elements'
import { styles } from '../styles'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import { signup } from "../backend";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifypass, setVerify] = useState("");
  const [error, setError] = useState(false);
  const [isSelectedMale, setSelectionMale] = useState(false);
  const [isSelectedFemale, setSelectionFemale] = useState(false);

  /**
   * These functions are to prevent two checkboxes to be clicked at the same time.
   * @param {*} currState 
   */
  const femaleClickHandler = (currState) => {
    if (!currState && isSelectedMale) {
      setSelectionFemale(true);
      setSelectionMale(false)
    } else {
      setSelectionFemale(!isSelectedFemale);
    }
  }
  const maleClickHandler = (currState) => {
    if (!currState && isSelectedFemale) {
      setSelectionMale(true);
      setSelectionFemale(false)
    } else {
      setSelectionMale(!isSelectedMale);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logoContainerSignUp}
      />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Full name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={error ? styles.inputViewError : styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder={error ? "Passwords do not match" : "Password"}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={error ? styles.inputViewError : styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder={error ? "Passwords do not match" : "Confirm Password"}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setVerify(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone Number"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(phone) => setPhone(phone)}
        />
      </View>
      <View>
        <CheckBox
          title="Male"
          checked={isSelectedMale}
          onPress={() => { maleClickHandler(isSelectedMale) }}
          containerStyle={styles.checkbox}
          checkedColor="#8D5238"
        />
        <CheckBox
          title="Female"
          checked={isSelectedFemale}
          onPress={() => { femaleClickHandler(isSelectedFemale) }}
          containerStyle={styles.checkbox}
          checkedColor="#8D5238"
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={async () => {
        const gender = isSelectedMale ? 'male' : 'female';
        if (password !== verifypass) {
          setError(true);
          return
        }

        try {
          await signup(name, phone, email, password , gender)
          // go to next screen
        } catch (e) {
           // show error msg
           console.log('backend' , e)
        }
      }}>
        <Text style={styles.loginText}>Sign up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

