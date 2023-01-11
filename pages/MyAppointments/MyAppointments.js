import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ActivityIndicator } from "react-native";
import { styles } from "../styles";
import AppoinmentContainer from "../components/AppoinmentContainer";
import { StatusBar } from "expo-status-bar";
import { getCustomerOrders } from "../../Firebase/OrderOperations";
import user from "../../Firebase/User";

import { useFocusEffect } from "@react-navigation/native";

const MyAppointments = ({ navigation }) => {
  const [appointments, setAppointments] = useState({});
  const [reRender, onReRender] = useState(false);
  const [animate, onAnimate] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      onAnimate(false);
      const getOrders = async () => {
        const app = await getCustomerOrders(user.userID());
        // console.log("app", app);
        // var appList = [];
        // Object.values(app).forEach((doc) => {
        //   appList.push(doc);
        // })
        // appList.sort((a, b) => (a.orderDate > b.orderDate) ? 1 : -1);
        // console.log("appList", appList);
        // setAppointments(appList);
        setAppointments(app);
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
