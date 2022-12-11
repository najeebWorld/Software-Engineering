import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "../styles";
import AppoinmentContainer from "../components/AppoinmentContainer";
import { StatusBar } from "expo-status-bar";
import { getCustomerOrders } from "../../Firebase/OrderOperations";
import user from "../../Firebase/User";

import { useFocusEffect } from "@react-navigation/native";

const MyAppointments = ({ navigation }) => {
  const [appointments, setAppointments] = useState({});
  const [reRender, onReRender] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const getOrders = async () => {
        const app = await getCustomerOrders(user.userID());
        setAppointments(app);
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
