import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { CheckBox } from 'react-native-elements'
import {styles} from '../styles'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from "react-native";


export default function LoginForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSelectedMale, setSelectionMale] = useState(false);
  const [isSelectedFemale, setSelectionFemale] = useState(false);

  /**
   * These functions are to prevent two checkboxes to be clicked at the same time.
   * @param {*} currState 
   */
  const femaleClickHandler= (currState)=>{
      if(!currState&&isSelectedMale){
        setSelectionFemale(true);
        setSelectionMale(false)
      }else{
        setSelectionFemale(!isSelectedFemale);
      }
  }
  const maleClickHandler= (currState)=>{
    if(!currState&&isSelectedFemale){
      setSelectionMale(true);
      setSelectionFemale(false)
    }else{
      setSelectionMale(!isSelectedMale);
    }
}
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')}
        style={styles.logoContainer}
      />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone Number"
          placeholderTextColor="#003f5c"
          onChangeText={(phone) => setPhone(phone)}
        />
      </View>
      <View>
        <CheckBox 
          title="Male" 
          checked={isSelectedMale}
          onPress={()=>{maleClickHandler(isSelectedMale)}}
          containerStyle={styles.checkbox}
          checkedColor="#8D5238"
          />
        <CheckBox 
          title="Female"
          checked={isSelectedFemale} 
          onPress={()=>{femaleClickHandler(isSelectedFemale)}}
          containerStyle={styles.checkbox}
          checkedColor="#8D5238"
          />
      </View>
       
      <TouchableOpacity style={styles.loginBtn} onPress={()=>{
                    const gender = isSelectedMale ? 'male' : 'female';
                    console.log(phone,name,gender);
        }}>
        <Text style={styles.loginText}>Make an appointment</Text>
      </TouchableOpacity>
    </View>
  );
}
 
