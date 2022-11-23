import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import LoginForm from "./pages/loginPage/LoginForm";
 
export default function App() {
  return (
    <LoginForm />
  )
}
 