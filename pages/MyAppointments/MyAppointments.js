import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "../styles";
import AppoinmentContainer from "../components/AppoinmentContainer";
import { StatusBar } from "expo-status-bar";
import { getCustomerOrders } from "../../Firebase/OrderOperations";
import user from "../../Firebase/User";
import moment from "moment";

import { useFocusEffect } from "@react-navigation/native";

const MyAppointments = ({ navigation }) => {
  const _today = moment(new Date()).format("YYYY-MM-DD");
  const _now = moment(new Date()).add(2,'hours').format("HH:mm"); // Add 2 hour, gor the current time in Israel (GMT+2).
  const [appointments, setAppointments] = useState({});
  const [reRender, onReRender] = useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
      const getOrders = async () => {
        const app = await getCustomerOrders(user.userID());
        let validOrders = {};
        for(const key in app){
          if(app[key].orderHour >= _now){
            validOrders[key] = app[key];
          }
        }
        setAppointments(validOrders);
      };
      getOrders().catch((err) => alert(err));
    }, [reRender])
  );

  const reRenderPage = () => {
    onReRender(!reRender);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/myappointments.png")}
        style={{
          ...styles.logoContainerSuccess,
          marginBottom: 60,
          marginRight: 100,
        }}
      />
      <AppoinmentContainer
        appointments={appointments}
        reRender={reRenderPage}
      />
      <TouchableOpacity
        style={{ ...styles.loginBtn, marginTop: 300 }}
        onPress={() => {
          navigation.navigate("AppointmentMaker");
        }}
      >
        <Text style={styles.loginText}>Make new appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyAppointments;
