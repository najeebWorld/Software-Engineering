import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ActivityIndicator } from "react-native";
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
  const [animate, onAnimate] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      onAnimate(false);
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

  const animateLoad = () =>{
    onAnimate(!animate);
    console.log('animate', animate);
  }
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
        animate={animateLoad}
      />
      <TouchableOpacity
        style={{ ...styles.loginBtn, marginTop: 300 }}
        onPress={() => {
          navigation.navigate("AppointmentMaker");
        }}
      >
        <Text style={styles.loginText}>Make new appointment</Text>
      </TouchableOpacity>
      <ActivityIndicator color='black' animating={animate} size='large'/>
    </View>
  );
};

export default MyAppointments;
