import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Button,
  Linking,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles";
import { deleteOrder } from "../../Firebase/OrderOperations";
import { getUser } from "../../Firebase/CustomerOperations";
import user from "../../Firebase/User";
import { useFocusEffect } from "@react-navigation/native";

export default function OrderDetails({ navigation, route }) {
  const item = route.params.item;
  const [phoneNumber, setPhoneNumber] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const getPhone = async () => {
        const customer = await getUser(item.cus_id);
        setPhoneNumber(customer.userPhone);
      };
      getPhone().catch((err) => alert(err));
    }, [])
  );

  const orderData = {
    clientName: item.name,
    clientPhone: phoneNumber,
    orderDate: `${item.date}, ${item.time}`,
    orderExtraInfo: item.info,
  };

  const CancelAppointment = async () => {
    await deleteOrder(user.userID(), item.date, item.time, item.orderKey);
    alert("Appointment Canceled Successfully");
    navigateBack();
  };

  const navigateBack = () => {
    navigation.navigate("CalendarPageBarber");
  };

  const callClient = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.containerForOrderDetails}>
      {/**
       * Layout header - contains the app's logo and user Img & name (name is the
       *    client name  in order Data).
       */}
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/logowithname.png")}
          style={styles.logoContainerOederDetail}
        />
        <Image
          source={require("../assets/user.png")}
          style={styles.userOrderDetails}
        />
        <Text style={styles.OrderDetailsUserName}>{orderData.clientName}</Text>
      </View>
      {/**
       * this View contain presention of th rest of the order data.
       */}
      <View
        style={{
          flex: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text style={styles.OrderDetailsOtherDetails}>
            {orderData.orderExtraInfo}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              callClient(orderData.clientPhone);
            }}
          >
            <Image
              source={require("../assets/UserPhoneLogo.png")}
              style={styles.logoContainerOederDetail}
            />
          </TouchableOpacity>

          <Text style={styles.OrderDetailsOtherDetails}>
            {orderData.clientPhone}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Image
            source={require("../assets/clock.png")}
            style={styles.logoContainerOederDetailOther}
          />
          <Text style={styles.OrderDetailsOtherDetails}>
            {orderData.orderDate}
          </Text>
        </View>
      </View>
      {/**
       * Last View contains the buttons for exit this page (back to 'myAppointments' page) using [navigateBack] function
       *     or to cancel this appointment using [CancelAppointment] function.
       */}
      <View
        style={{ flex: 2, justifyContent: "flex-start", alignItems: "center" }}
      >
        <View style={styles.orderDetailsButtons}>
          <Button
            onPress={CancelAppointment}
            title="Cancel Appointment"
            color="#ff0000"
            style={{ borderRadius: 25 }}
          />
        </View>
        <View style={styles.orderDetailsButtons}>
          <Button onPress={navigateBack} title="Appointments" color="#000000" />
        </View>
      </View>
    </View>
  );
}
