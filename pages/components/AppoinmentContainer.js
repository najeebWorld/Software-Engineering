import React, { useState } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { styles } from "../styles";
import Appointment from "./Appointment";
import user from "../../Firebase/User";

const AppoinmentContainer = (props) => {
  return (
    <View style={styles.appointmentContainer}>
      <ScrollView contentContainerStyle={styles.appointmentContainerContent}>
        {Object.keys(props.appointments).map((key) => {
          return (
            <Appointment
              user={props.appointments[key]["barberId"]}
              type={props.appointments[key]["extra_info"]}
              date={props.appointments[key]["orderDate"]}
              time={props.appointments[key]["orderHour"]}
              barberName={props.appointments[key]["barberName"]}
              docID={key}
              reRender={props.reRender}
              key={Math.random()}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AppoinmentContainer;
