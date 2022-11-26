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
import CalendarPage from "./pages/calendarPage/calendarPage";
 
export default function App() {
  return (
    <CalendarPage />
  )
}
 